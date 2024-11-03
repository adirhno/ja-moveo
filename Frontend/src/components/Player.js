import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { API } from '../config'

export default function Player({ setLive }) {

  useEffect(() => {
    const newSocket = io(API);

    // Listen for connection
    newSocket.on("connect", () => {
      console.log("Socket ID:", newSocket.id);
    });

    newSocket.on("songSelected", (song) => {
      if (song) {
        setLive(true);
      }
    });

    return () => {
      newSocket.off("songSelected");
      newSocket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Waiting for next song...</h1>
    </div>
  );
}
