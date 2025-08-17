const express = require("express");
const path = require("path");
const http = require("http");
const cookieParser = require('cookie-parser');
const app = express();
const { default: mongoose } = require("mongoose");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  },
});

const signallingServer = require("./server/signalling-server.js");
const { handleUserSignUP, handleUserSignIn } = require("./controller/user");
const authMiddleware = require("./middleware/auth");

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "www")));
app.use(express.static(path.join(__dirname, "icons")));
app.use(express.static(path.join(__dirname, "assets")));
app.use(express.static(path.join(__dirname, "node_modules/vue/dist/")));

// Make sure these middleware are before the routes
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DB_PATH =
  "mongodb+srv://dhyanu:Goodboy%402216@cluster0.dwmer2w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("Connected to Mongo");
    server.listen(PORT, null, () => {
      console.log("Talk server started");
      console.log({ port: PORT, node_version: process.versions.node });
    });
  })
  .catch((err) => {
    console.log("Error while connecting to Mongo: ", err);
  });

// Public routes
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "www/index.html"))
);
app.get("/signUP", (req, res) =>
  res.sendFile(path.join(__dirname, "www/signUP.html"))
);
app.post("/user", handleUserSignUP);
app.post("/user/signin", handleUserSignIn);

// Protected routes
app.get("/:room", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "www/app.html"));
});

io.sockets.on("connection", signallingServer);
