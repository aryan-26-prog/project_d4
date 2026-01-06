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

//This used to fix buffering
mongoose.set("bufferCommands", false);

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
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    // Routes 
    app.use("/api/confessions", confessionRouter);

    app.get("/", (req, res) => {
      res.send("Anonymous Confession Backend is running");
    });

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
