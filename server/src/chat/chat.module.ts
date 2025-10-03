// src/chat/chat.module.ts
import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ChatGateway } from 'src/gateways/chat.gateway';

@Module({
  providers: [ChatService, ChatGateway, PrismaService],
  controllers: [ChatController],
  exports: [ChatService],
})
export class ChatModule {}