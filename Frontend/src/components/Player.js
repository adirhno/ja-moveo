import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

export default function Player({ setLive }) {

  useEffect(() => {
    const newSocket = io("http://localhost:3001");

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
