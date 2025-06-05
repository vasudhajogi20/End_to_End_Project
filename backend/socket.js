
import { Server } from "socket.io"; 

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", 
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);
  });
};

export const emitTableAvailabilityUpdate = (data) => {
  if (io) {
    io.emit("tableUpdate", data); 
  }
};
