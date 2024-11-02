import React, { useEffect, useRef, useState } from 'react';

export default function Live({ liveSong, user, setLive, setSongs, currUser }) {
    const lines = useRef(null);
    const [scrolling, setScrolling] = useState(false);

    console.log(liveSong)

    function handleQuit() {
        setLive(false);
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


    return (
      <>
        <div className='liveSongTitle'><span>{liveSong.name}</span><span>{liveSong.author}</span></div>
        <div className='live'>
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
        </div>
      </>
    );
}