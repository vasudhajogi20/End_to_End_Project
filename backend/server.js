import http from "http";
import dotenv from "dotenv";
import app from "./app.js";
import { Server } from "socket.io";

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

export function emitTableAvailabilityUpdate(data) {
    io.emit("tableAvailabilityUpdate", data);
}

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
