import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';


export default function Live({ liveSong, live, user, setLive, currUser, setLiveSong }) {
    const lines = useRef(null);
    const [scrolling, setScrolling] = useState(false);
    const [socket, setSocket] = useState(null); 

    useEffect(() => {
        const newSocket = io('http://localhost:3001');

        newSocket.on('connect', () => {
            console.log("Socket connected:"); 
        });
        
        newSocket.on('songSelected',async (song) => {
            console.log("back from socket", song);
            setSocket(newSocket)
            setLiveSong(song);
        });

        newSocket.on('quitSession', () => {
            console.log("admin quit the session");
            setLive(false);
        });

        return () => {
            newSocket.off('songSelected'); 
            newSocket.disconnect(); 
        };
    }, []);
    
    function handleQuit() {
        socket.emit('quitSession'); 
        setLive(false); 
    }

    const startScrolling = () => {
        setScrolling(true);
    };

    const stopScrolling = () => {
        setScrolling(false);
    };

    useEffect(() => {
        let scrollInterval;

        if (scrolling) {
            scrollInterval = setInterval(() => {
                if (lines.current) {
                    lines.current.scrollTop += 1.6; 
                }
            }, 100);
        }

        return () => {
            clearInterval(scrollInterval);
        };
    }, [scrolling]);

    return (
      <>
        {socket && liveSong.song.length > 0?
         <div className='live'>
            <div className='liveSongTitle'><span>{liveSong.name}</span><span>{liveSong.author}</span></div>
         {user === "admin" && (
                <button className='quitButton' onClick={handleQuit}>quit</button>
            )}
        <div className='lines' ref={lines}>
            {liveSong.song.map((line, index) => (
               <p className='line' key={index}>
               {line.map((word, idx) => (
                 <span className='lyrics' key={idx}>
                  {currUser.instrument == "singer"?<></>: <span className='chords'>{word.chords}</span>}
                   <span className='word'>{word.lyrics}</span>
                 </span>
               ))}
             </p>
            ))}
        </div>
        <button
        className={`scrollButton ${scrolling ? 'scrolling' : 'not-scrolling'}`}
        onClick={scrolling ? stopScrolling : startScrolling}
        >
            {scrolling ? 'Stop Scrolling' : 'Start Scrolling'}
        </button>
    </div>:<></>}
      </>
    );
}