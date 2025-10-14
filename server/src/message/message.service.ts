import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { ChatClientEvents, ChatEventType } from "src/chat/event/chat.event";

@Injectable()
export class MessageService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async createMessage(createMessage: CreateMessageDto) {
    const message = await this.prismaService.message.create({
      data: createMessage,
    });

    this.eventEmitter.emit(ChatClientEvents.SEND_MESSAGE, {
      chatId: message.chatId,
      content: message.content,
      senderId: message.senderId,
    });
    return message;
  }
}
