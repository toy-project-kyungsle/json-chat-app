// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const socketIO = require("socket.io");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    nextHandler(req, res, parsedUrl);
  });

  const io = socketIO(server);
  io.on("connection", (socket) => {
    console.log("A client connected");

    socket.on("message", (msg) => {
      console.log("Received message from client:", msg);
      // 클라이언트에게 응답을 보냅니다.
      socket.emit("response", `Server received your message: ${msg}`);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    // 여기서 소켓 이벤트들을 처리할 수 있습니다.
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
