
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const initializeSocketServer = require("./socket");

const app = express();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.options("*", cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", userRoutes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/chat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a new HTTP server
const server = http.createServer(app);

// Initialize Socket.IO on the server
const io = require("./socket")(server);

// Initialize the Socket.IO server
initializeSocketServer(io);

// Start the server listening for requests
const PORT = process.env.PORT || 3010;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
