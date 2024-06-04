"use client";
import { useEffect, useState } from "react";
import { socket } from "@/socket";
import { MessageCircleIcon } from "lucide-react"


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [messages, setMessages] = useState<string[]>([])

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }
    socket.on('welcome', (message: string) => {
      console.log(message);
    });

    // Listen for the 'broadcast' event
    socket.on('broadcast', (message: string) => {
      console.log(message);
      setMessages([message,...messages]);
    });

    //Emit a message to the server
    socket.emit('message', 'Hello from the client!');

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center ">
        <MessageCircleIcon/>
      <h2>Dev Chat</h2>
      <p>Send and recieve messages</p>
      <div>
      <p>Status: { isConnected ? "connected" : "disconnected" }</p>
      <p>Transport: { transport }</p>
    </div>
    <div>
     { messages?.map((message, index)=>{
      return <h1 key={index}> Messages : {message}</h1>
      })}
    </div>
      </div>
    </>
  );
}
