// server.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const { v4 } = require('uuid');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: ['http://192.168.0.7:19006', 'http://192.168.0.8:19006'],
        methods: ['GET', 'POST'],
        credentials: true,
    },
});
const LoremIpsum = require('lorem-ipsum').LoremIpsum;

// CORS 설정 (일반 HTTP 요청)
app.use((req, res, next) => {
    const allowedOrigins = ['http://192.168.0.7:19006', 'http://192.168.0.8:19006'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// 소켓 연결 이벤트 처리
io.on('connection', (socket) => {
    console.log('A user connected');

    // 클라이언트로부터 메시지 수신
    socket.on('chat', (data) => {
        console.log('Received message from client:', data);
        // 클라이언트에게 응답을 보냅니다.
        const newId = v4();
        const lorem = new LoremIpsum({
            sentencesPerParagraph: {
                max: 8,
                min: 4,
            },
            wordsPerSentence: {
                max: 16,
                min: 4,
            },
        });
        const resSentence = lorem.generateSentences(3);
        const responseBreakTime = Math.floor(Math.random() * 1000) + 1000;

        setTimeout(() => {
            const nowTime = Date.now();
            fetch('http://localhost:3001/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: newId,
                    conversationId: data.conversationId,
                    text: resSentence,
                    createdAt: nowTime,
                    userId: data.userId,
                    userName: data.userName,
                    userAvatarUrl: data.userAvatarUrl,
                }),
            }).then(() => {
                socket.emit('chat', {
                    id: newId,
                    conversationId: data.conversationId,
                    text: resSentence,
                    createdAt: nowTime,
                    userId: data.userId,
                    userName: data.userName,
                    userAvatarUrl: data.userAvatarUrl,
                });
            });
        }, responseBreakTime);
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
