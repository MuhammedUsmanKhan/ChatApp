// src/chat/chat.gateway.ts
import { Logger } from "@nestjs/common";
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { CommonGateway } from "src/common/gateway/base.gateway";
import { ChatService } from "./chat.service";
import { WSAuthConfigService } from "src/auth/ws-auth.service";
import { ChatClientEvents, ChatEventType } from "./event/chat.event";

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3001",
    credentials: true,
  },
})
export class ChatGateway extends CommonGateway {
  protected readonly logger = new Logger(ChatGateway.name);

  constructor(
    protected readonly chatService: ChatService,
    protected readonly wsAuthConfigService: WSAuthConfigService
  ) {
    super(wsAuthConfigService); // ✅ FIXED: pass required argument to base class
  }

  // Optional override if you want extra connection logic
  override handleConnection(client: Socket) {
    super.handleConnection(client);

    const userId = this.getUserIdFromSocket(client);
    if (userId) {
      this.joinPersonalRoom(client, userId);
    }
  }

  @SubscribeMessage(ChatClientEvents.JOIN_ROOM)
  handleJoinRoom(
    @MessageBody() payload: { chatId: string },
    @ConnectedSocket() client: Socket
  ) {
    const { chatId } = payload;

    // User joins that room
    client.join(chatId);
  }

  @SubscribeMessage(ChatClientEvents.LEAVE_ROOM)
  handleLeaveRoom(
    @MessageBody() payload: { chatId: string },
    @ConnectedSocket() client: Socket
  ) {
    const { chatId } = payload;
    const user = this.getUserFromSocket(client);

    client.leave(chatId);
    console.log(`User ${user?.full_name} left room ${chatId}`);

    // Optional: notify others
    client.to(chatId).emit(ChatEventType.USER_LEFT, { user });
  }

  // --- Event Handlers ---
  @SubscribeMessage(ChatClientEvents.SEND_MESSAGE)
  handleMessage(
    @MessageBody() payload: { chatId: string; content: string },
    @ConnectedSocket() client: Socket
  ) {
    const userId = this.getUserIdFromSocket(client);

    this.logger.log(`User ${userId} sent message to chat ${payload.chatId}`);

    // Emit message to all users in that chat room
    this.server.to(payload.chatId).emit(ChatEventType.NEW_MESSAGE, {
      senderId: userId,
      content: payload.content,
      timestamp: new Date(),
    });
  }

}
