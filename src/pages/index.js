// pages/index.js 또는 다른 컴포넌트
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io();

function Home() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the server");
      // 서버에 메시지를 보냅니다.
    });
    socket.emit("message", "Hello, Server!");

    socket.on("response", (msg) => {
      console.log("Received response from server:", msg);
    });

    return () => {
      socket.off("connect");
      socket.off("response");
    };
  }, []);

  return <div>Welcome to Next.js!</div>;
}

export default Home;
