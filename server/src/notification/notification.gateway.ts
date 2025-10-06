import { Logger } from "@nestjs/common";
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { CommonGateway } from "src/common/gateway/base.gateway";
import { WSAuthConfigService } from "src/auth/ws-auth.service";
import { NotificationService } from "./notification.service";

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    credentials: true,
  },
})
export class NotificationGateway extends CommonGateway {
  protected readonly logger = new Logger(NotificationGateway.name);

  constructor(
    protected readonly notificationService: NotificationService,
    protected readonly wsAuthConfigService: WSAuthConfigService
  ) {
    super(wsAuthConfigService);
  }

  override handleConnection(client: Socket) {
    super.handleConnection(client);

    const userId = this.getUserIdFromSocket(client);
    if (userId) {
      this.joinPersonalRoom(client, userId);
      this.logger.log(`User ${userId} connected to NotificationGateway`);
    }
  }

  // --- Event Listeners (client → server) ---
//   @SubscribeMessage("mark_notification_read")
//   async handleMarkRead(
//     @MessageBody() payload: { notificationId: string },
//     @ConnectedSocket() client: Socket
//   ) {
//     const userId = this.getUserIdFromSocket(client);
//     this.logger.log(`User ${userId} marked notification ${payload.notificationId} as read`);

//     await this.notificationService.markAsRead(payload.notificationId, userId);
//   }

  // --- Server → Client Emits (via service) ---
  sendNotificationToUser(userId: string, notification: any) {
    this.server.to(`user_${userId}`).emit("new_notification", notification);
    this.logger.debug(`Notification sent to user_${userId}`);
  }
}
