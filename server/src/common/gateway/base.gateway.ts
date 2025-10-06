import { Logger, UseGuards } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { WsJwtAuthGuard } from "src/auth/guard/ws-jwt.guard";
import { SocketAuthMiddleware } from "src/auth/middleware/ws-auth.mw";
import { WSAuthConfigService } from "src/auth/ws-auth.service";

@UseGuards(WsJwtAuthGuard)
@WebSocketGateway()
export abstract class CommonGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  protected abstract readonly logger: Logger;

  @WebSocketServer()
  server: Server;

  constructor(protected readonly wsAuthConfigService: WSAuthConfigService) {}

  afterInit(server: Server) {
    this.logger.log(`${this.constructor.name} initialized`);

    // Apply middleware for socket authentication (JWT validation)
    server.use(SocketAuthMiddleware(this.wsAuthConfigService) as any);
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  protected getUserIdFromSocket(client: Socket): string {
    return client.data?.user?.id;
  }

  protected joinPersonalRoom(client: Socket, userId: string) {
    client.join(`user_${userId}`);
    this.logger.debug(`User ${userId} joined personal room`);
  }
}
