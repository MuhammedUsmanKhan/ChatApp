// src/chat/chat.controller.ts
import { Controller, Get, Post, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get()
  async getUserChats(@Query('userId') userId: string) {
    return this.chatService.getUserChats(userId);
  }

  @Get(':chatId/messages')
  async getChatMessages(
    @Param('chatId') chatId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '50'
  ) {
    return this.chatService.getChatMessages(chatId, parseInt(page), parseInt(limit));
  }

  @Post()
  async createChat(
    @Body() createChatDto: { participantIds: string[]; name?: string }
  ) {
    // Check if it's a 1-on-1 chat and find existing one
    if (createChatDto.participantIds.length === 2 && !createChatDto.name) {
      const existingChat = await this.chatService.findChatBetweenUsers(createChatDto.participantIds);
      if (existingChat) {
        return existingChat;
      }
    }
    
    return this.chatService.createChat(createChatDto.participantIds, createChatDto.name);
  }
}