const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// ================= MIDDLEWARE =================
app.use(express.json());

// Allowed Frontend URLs
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://modern-dark-chat.vercel.app"
];

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  })
);

// ================= ROUTES =================
app.use("/api/auth", require("./routes/authRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("API is running successfully 🚀");
});

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("typing", (data) => {
    socket.to(data.room).emit("typing", data);
  });

  socket.on("stop_typing", (data) => {
    socket.to(data.room).emit("stop_typing", data);
  });

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

// ================= SERVER START =================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
