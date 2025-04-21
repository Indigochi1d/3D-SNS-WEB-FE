import { io, Socket } from "socket.io-client";

const socketServerURL: string = import.meta.env.VITE_SOCKET_SERVER;

export const socket: Socket = io(socketServerURL, {
  transports: ["websocket"],
});
