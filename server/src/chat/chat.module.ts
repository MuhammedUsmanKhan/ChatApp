// src/chat/chat.module.ts
import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { PrismaService } from "../prisma/prisma.service";
import { ChatGateway } from "src/chat/chat.gateway";
import { WSAuthConfigService } from "src/auth/ws-auth.service";

@Module({
  providers: [ChatService, WSAuthConfigService, ChatGateway, PrismaService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}
