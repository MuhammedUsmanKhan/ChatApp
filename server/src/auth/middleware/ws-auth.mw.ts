//ws-auth.mx.ts

import { Socket } from 'socket.io';
import { WSAuthConfigService } from '../ws-auth.service';

type SocketIOMiddleWare = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (
  configService: WSAuthConfigService,
): SocketIOMiddleWare => {
  return (client, next) => {
    try {
       console.log({headers:client.handshake.headers});
      const { authorization } = client.handshake.headers;
     
      
      configService.isValidAuthHeader(authorization);
      next();
    } catch (error) {
      next(error);
    }
  };
};