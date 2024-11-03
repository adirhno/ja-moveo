import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { ApiUrl } from '../config';

export default function Player ({ setLive }){
    useEffect(() => {
        const newSocket = io(ApiUrl);

        // Listen for connection
        newSocket.on('connect', () => {
            console.log("Socket connect:", newSocket.id); 
        });
        
        newSocket.on('songSelected',async (song) => {
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

