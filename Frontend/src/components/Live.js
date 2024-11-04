import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { ApiUrl } from '../config'


export default function Live({ liveSong, live, setLive, currUser, setLiveSong, setSongs }) {
    const lines = useRef(null);
    const [scrolling, setScrolling] = useState(false);
    const [socket, setSocket] = useState(null); 

    useEffect(() => {
        console.log(ApiUrl)
        const newSocket = io(ApiUrl);

        newSocket.on('connect', () => {
            console.log("Socket connected"); 
            setLive(true)
        });
        
        newSocket.on('songSelected',async (song) => {
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
    }, [live]);
    
    function handleQuit() {
        socket.emit('quitSession'); 
        setSongs([]); 
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
    console.log(liveSong)
    return (
      <>
        {socket && liveSong.song.length > 0?
         <div className='live'>
            <div className='liveSongTitle'><span>{liveSong.name}</span><span>{liveSong.artist}</span></div>
         {currUser.admin ?
                <button className='quitButton' onClick={handleQuit}>quit</button>:<></>
            }
        <div className='lines' ref={lines}>
            {liveSong.song.map((line, index) => (
               <p className='line' key={index}>
                {liveSong.lan == 'heb'? (line.map((word, idx) => (
                 <span className='lyrics' key={idx}>
                  {currUser.instrument == "singer"?<></>: <span className='chords'>{word.chords}</span>}
                   <span className='word'>{word.lyrics}</span>
                 </span>
               )).reverse()):  (line.map((word, idx) => (
                <span className='lyrics' key={idx}>
                 {currUser.instrument == "singer"?<></>: <span className='chords'>{word.chords}</span>}
                  <span className='word'>{word.lyrics}</span>
                </span>
              )))}
             
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