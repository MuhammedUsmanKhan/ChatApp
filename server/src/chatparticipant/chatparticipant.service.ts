import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// import { ChatService } from "src/chat/chat.service";
// import { AddFriendDto } from "./dto/add-friend.dto";

@Injectable()
export class ChatParticipantService {
  // , private chatService:ChatService
  constructor(private readonly prismaService: PrismaService) {}

  
}
