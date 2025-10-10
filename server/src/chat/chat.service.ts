// src/chat/chat.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateChatDto } from "./dto/create-chat.dto";

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async createChat() {
    const chat = await this.prisma.chat.create({
      data: {
        isGroup: false,
      },
    });

    return chat;
  }

  async createGroupChat() {
    const chat = await this.prisma.chat.create({
      data: {
        name:'group chat',
        isGroup: true,
      },
    });

    return chat;
  }

  // async createChat(participantIds: string[], name?: string) {
  //   const isGroup = participantIds.length > 2;

  //   return this.prisma.chat.create({
  //     data: {
  //       name: isGroup ? name : null,
  //       isGroup,
  //       participants: {
  //         create: participantIds.map((userId) => ({
  //           userId,
  //         })),
  //       },
  //     },
  //     include: {
  //       participants: {
  //         include: {
  //           user: {
  //             select: { id: true, username: true, email: true },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }

  // async sendMessage(chatId: string, senderId: string, content: string) {
  //   return this.prisma.message.create({
  //     data: {
  //       content,
  //       chatId,
  //       senderId,
  //     },
  //     include: {
  //       sender: {
  //         select: { id: true, username: true, email: true },
  //       },
  //       chat: true,
  //     },
  //   });
  // }

  // async getUserChats(userId: string) {
  //   return this.prisma.chat.findMany({
  //     where: {
  //       participants: {
  //         some: {
  //           userId,
  //         },
  //       },
  //     },
  //     include: {
  //       participants: {
  //         include: {
  //           user: {
  //             select: { id: true, username: true, email: true },
  //           },
  //         },
  //       },
  //       messages: {
  //         orderBy: { createdAt: "desc" },
  //         take: 1, // Get only the last message for preview
  //       },
  //     },
  //     orderBy: { updatedAt: "desc" },
  //   });
  // }

  // async getChatMessages(chatId: string, page: number = 1, limit: number = 50) {
  //   const skip = (page - 1) * limit;

  //   return this.prisma.message.findMany({
  //     where: { chatId },
  //     include: {
  //       sender: {
  //         select: { id: true, username: true, email: true },
  //       },
  //     },
  //     orderBy: { createdAt: "desc" },
  //     skip,
  //     take: limit,
  //   });
  // }

  // async updateChatTimestamp(chatId: string) {
  //   return this.prisma.chat.update({
  //     where: { id: chatId },
  //     data: { updatedAt: new Date() },
  //   });
  // }

  // async findChatBetweenUsers(userIds: string[]) {
  //   return this.prisma.chat.findFirst({
  //     where: {
  //       isGroup: false,
  //       participants: {
  //         every: {
  //           userId: { in: userIds },
  //         },
  //       },
  //     },
  //     include: {
  //       participants: {
  //         include: {
  //           user: {
  //             select: { id: true, username: true, email: true },
  //           },
  //         },
  //       },
  //     },
  //   });
  // }
}
