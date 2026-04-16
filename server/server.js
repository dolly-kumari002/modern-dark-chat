const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

// Middlewares
app.use(cors());
app.use(express.json());

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Make io accessible in routes
app.set('io', io);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');

  app.use(express.static(clientBuildPath));

  // ✅ FIXED ROUTE (important)
  app.get('/*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
} else {
  // Development route
  app.get('/', (req, res) => {
    res.send('API is running... (Development Mode)');
  });
}

// Socket events
io.on('connection', (socket) => {
  console.log(`Socket User connected: ${socket.id}`);
  
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });
  
  socket.on('typing', (data) => {
    socket.to(data.room).emit('typing', data);
  });

  socket.on('stop_typing', (data) => {
    socket.to(data.room).emit('stop_typing', data);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Server start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
