# Modern Dark Chat Application

A professional, responsive Real-time Chat Web Application built with the MERN stack + Socket.io, featuring a "Modern Dark" aesthetic and smooth Framer Motion animations.

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS, Framer Motion, Socket.io-client, React Router
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.io, JWT Authentication

## Key Features
- Dynamic WhatsApp/Discord inspired split-page design
- Real-time messaging and "typing..." indicators out-of-the-box
- Secure JWT-based Login/Signup system
- "Gravity-defying" micro-animations for elements

## How to Run

### 1. Start the Backend Server
```bash
cd server
npm install
# Ensure you have a local MongoDB instance running on mongodb://127.0.0.1:27017
# Or create a .env file with MONGO_URI
npm run server # or node server.js
```

### 2. Start the Frontend Client
```bash
cd client
npm install
npm run dev
```

Navigate to the provided localhost link (typically http://localhost:5173). Open multiple browser windows to test the real-time capabilities seamlessly side-by-side!
