import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export default function Player ({liveSong, setLive}){
    useEffect(() => {
        const newSocket = io('http://localhost:3001');

        // Listen for connection
        newSocket.on('connect', () => {
            console.log("Socket ID:", newSocket.id); 
        });
        
        newSocket.on('songSelected',async (song) => {
            console.log("back from socket", song);
            if(song){
                setLive(true)
            } else{
                setLive(false)
            }
        });

        return () => {
            newSocket.off('songSelected');
            newSocket.off('quitSession');
            newSocket.disconnect(); 
        };
    }, []);


    return (
        <div > 
        <h1>
        Waiting for next song...
        </h1>
        </div>
    );
};

