// // src/chat/chat.gateway.ts
// import {
//   WebSocketGateway,
//   WebSocketServer,
//   SubscribeMessage,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   MessageBody,
// } from "@nestjs/websockets";
// import { Server, Socket } from "socket.io";
// import { ChatService } from "src/chat/chat.service";
// import { CommonGateway } from "src/common/gateway/base.gateway";

// @WebSocketGateway({
//   cors: {
//     origin: process.env.FRONTEND_URL || "http://localhost:3001",
//     credentials: true,
//   },
// })
// export class ChatGateway extends CommonGateway {
//   @WebSocketServer() server: Server;

//   constructor(private chatService: ChatService) {}

//   private connectedUsers: Map<string, string> = new Map(); // socketId -> userId

//   async handleConnection(client: Socket) {
//     // Extract user ID from auth token (you'll need to implement this)
//     const userId = await this.getUserIdFromToken(client);
//     if (userId) {
//       this.connectedUsers.set(client.id, userId);
//       console.log(`User ${userId} connected with socket ${client.id}`);

//       // Join user to their personal room and all their chat rooms
//       client.join(`user_${userId}`);
//     }
//   }

//   handleDisconnect(client: Socket) {
//     const userId = this.connectedUsers.get(client.id);
//     if (userId) {
//       this.connectedUsers.delete(client.id);
//       console.log(`User ${userId} disconnected`);
//     }
//   }

//   @SubscribeMessage("joinChat")
//   handleJoinChat(client: Socket, chatId: string) {
//     console.log(`Socket ${chatId}`);

//     client.join(`chat_${chatId}`);
//     console.log(`Socket ${client.id} joined chat ${chatId}`);
//   }

//   @SubscribeMessage("sendMessage")
//   async handleSendMessage(
//     client: Socket,
//     payload: { chatId: string; content: string }
//   ) {
//     const userId = this.connectedUsers.get(client.id);

//     if (!userId) {
//       client.emit("error", "User not authenticated");
//       return;
//     }

//     try {
//       // Save message to database
//       const message = await this.chatService.sendMessage(
//         payload.chatId,
//         userId,
//         payload.content
//       );

//       // Broadcast to all users in the chat room
//       this.server.to(`chat_${payload.chatId}`).emit("receiveMessage", message);

//       // Update chat's updatedAt timestamp
//       await this.chatService.updateChatTimestamp(payload.chatId);
//     } catch (error) {
//       client.emit("error", "Failed to send message");
//       console.error("Error sending message:", error);
//     }
//   }

//   @SubscribeMessage("typing")
//   handleTyping(client: Socket, payload: { chatId: string; isTyping: boolean }) {
//     const userId = this.connectedUsers.get(client.id);
//     if (userId) {
//       // Broadcast typing indicator to other users in the chat
//       client.to(`chat_${payload.chatId}`).emit("userTyping", {
//         userId,
//         isTyping: payload.isTyping,
//       });
//     }
//   }

//   private async getUserIdFromToken(client: Socket): Promise<string | null> {
//     // Implement JWT token verification from handshake auth
//     // This depends on your existing auth setup

//     console.log(client.handshake);

//     try {
//       const token = client.handshake.auth.token;
//       // Verify token and extract user ID
//       // return userId;
//       return "user-id-from-token"; // Replace with actual implementation
//     } catch (error) {
//       return null;
//     }
//   }
// }

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

  // --- Event Handlers ---
  @SubscribeMessage(ChatClientEvents.SEND_MESSAGE)
  handleMessage(
    @MessageBody() payload: { chatId: string; content: string },
    @ConnectedSocket() client: Socket
  ) {
    const userId = this.getUserIdFromSocket(client);

    this.logger.log(`User ${userId} sent message to chat ${payload.chatId}`);

    // Emit message to all users in that chat room
    this.server.to(payload.chatId).emit("new_message", {
      senderId: userId,
      content: payload.content,
      timestamp: new Date(),
    });
  }



@SubscribeMessage(ChatClientEvents.JOIN_ROOM)
  handleJoinRoom(
    @MessageBody() payload: { chatId: string; content: string },
    @ConnectedSocket() client: Socket
  ) {
    const userId = this.getUserIdFromSocket(client);

    this.logger.log(`User ${userId} sent message to chat ${payload.chatId}`);

    // Emit message to all users in that chat room
    this.server.to(payload.chatId).emit("new_message", {
      senderId: userId,
      content: payload.content,
      timestamp: new Date(),
    });
  }

}
