// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const socketIO = require('socket.io');
const { v4 } = require('uuid');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
    const server = createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        nextHandler(req, res, parsedUrl);
    });

    const io = socketIO(server);
    io.on('connection', (socket) => {
        console.log('A client connected');

        socket.on('message', (msg) => {
            console.log('Received message from client:', msg);
            // 클라이언트에게 응답을 보냅니다.
            const newId = v4();
            const nowTime = Date.now();

            fetch('http://localhost:3001/emails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: newId,
                    conversationId: msg.conversationId,
                    text: 'msg.text',
                    createdAt: nowTime,
                    fromUser: true,
                }),
            }).then(() => {
                socket.emit('message', {
                    id: newId,
                    conversationId: msg.conversationId,
                    text: 'msg.text',
                    createdAt: nowTime,
                    fromUser: true,
                });
            });
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });

        // 여기서 소켓 이벤트들을 처리할 수 있습니다.
    });

    server.listen(port, (err) => {
        if (err) throw err;
        console.log(`> Ready on http://localhost:${port}`);
    });
});
