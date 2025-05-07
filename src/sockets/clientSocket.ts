import { io, Socket } from "socket.io-client";

const socketServerURL: string = import.meta.env.VITE_SOCKET_SERVER;

export const socket: Socket = io(socketServerURL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});
