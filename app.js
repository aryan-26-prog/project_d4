require("dotenv").config();
const http = require("http")
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Server } = require("socket.io");

const confessionRouter = require("./routes/confessionRouter");

//Creating an express server
const app = express();
const server = http.createServer(app);


//Socket.io setup for realtime
const io = new Server(server, {
  cors: {
    origin: "*",   
    methods: ["GET", "POST", "PATCH"]
  }
});


//Used to access socket in controllers
app.use((req, res, next) => {
  req.io = io;
  next();
});

//Adding socket events
io.on("connection", (socket) => {
  console.log("Client Connected", socket.id);

  socket.on("disconnect", () => {
    console.log("Client Disconnected", socket.id);
  });
});


//Adding middlewares
app.use(cors());
app.use(express.json());


//Database Connections
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(error => console.log("MongoDB connection error", error));


//Adding Routes
app.use("/api/confessions", confessionRouter);

app.get("/", (req, res) => {
  res.send("Anonymous Confession Backend is running");
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
