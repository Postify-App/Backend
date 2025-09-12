import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { io as Client } from 'socket.io-client';

import env from './config/env';
import logger from './config/logger';

export const initSockets = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  const modelSocket = Client(env.MODEL_BASE_URL, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    transports: ['websocket'],
  });

  modelSocket.on('connect', () => {
    logger.info(`Backend connected to model socket`);
  });

  // Client connecting to Backend
  io.on('connection', (socket) => {
    logger.info(`Client connected to backend socket: ${socket.id}`);

    // Handle disconnection
    socket.on('disconnect', (reason) => {
      logger.info(
        `Client disconnected from backend socket: ${socket.id}, Reason: ${reason}`
      );
    });

    // Client => Backend => Model
    socket.onAny((event, ...args) => {
      modelSocket.emit(event, ...args);
    });

    // Model => Backend => Client
    modelSocket.onAny((event, ...args) => {
      socket.emit(event, ...args);
    });
  });
};
