// server.js

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// 소켓 연결 이벤트 처리
io.on('connection', (socket) => {
    console.log('A user connected');

    // 클라이언트로부터 메시지 수신
    socket.on('message', (data) => {
        console.log('Received message:', data);

        // 모든 클라이언트에게 메시지 브로드캐스트
        io.emit('message', data);
    });

    // 클라이언트 연결 종료 이벤트 처리
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// 서버 실행
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
