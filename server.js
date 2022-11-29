const { createServer } = require("http");
const express = require("express");
const { Server } = require("socket.io");
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
const socketController = require("./src/socket");
const { PORT } = require("./src/utils/env");
const { failed } = require("./src/utils/createResponse");

// deklarasi express
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(
//   helmet({
//     crossOriginEmbedderPolicy: false,
//     crossOriginResourcePolicy: false,
//   })
// );
app.use(xss());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static("public"));

// root router
app.get("/", (req, res) => res.send(`Telegrams API v1.0`));
// main router
app.use(require("./src/routes/auth.route.js"));
app.use(require("./src/routes/user.route.js"));
// 404 router
app.use((req, res) => {
  failed(res, {
    code: 404,
    payload: "Resource on that url not found",
    message: "Not Found",
  });
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log("New user connected to socket");
  socketController(io, socket);
});

// running server
httpServer.listen(PORT || 5000, () => {
  console.log(`Server started on port : ${PORT}`);
});
