import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { ApiUrl } from '../config';

export default function Player ({ setLive }){
    useEffect(() => {
        const newSocket = io(ApiUrl);
        newSocket.on('connect', () => {
            console.log("Socket connected:", newSocket.id); 
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
        <div className='player'> 
        <h1>
        Waiting for next song...
        </h1>
        </div>
    );
};

