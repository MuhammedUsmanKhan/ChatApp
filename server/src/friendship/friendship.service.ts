import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAddFriendDto } from "./dto/create-add-friend.dto";
import { UpdateAddFriendDto } from "./dto/update-add-friend.dto";
import { ChatService } from "src/chat/chat.service";
// import { AddFriendDto } from "./dto/add-friend.dto";

@Injectable()
export class FriendshipService {
  constructor(private readonly prismaService: PrismaService, private chatService:ChatService) {}

  async createAddFriend(createAddFriendDto: CreateAddFriendDto) {
    const createAddUser = await this.prismaService.friendship.create({
      data: createAddFriendDto,
    });

    return createAddUser;
  }

  async updateAddFriend(id: string, updateAddFriendDto: UpdateAddFriendDto) {
    const updateAddUser = await this.prismaService.friendship.update({
      where: {
        id,
      },
      data: {
        status: updateAddFriendDto.status,
      },
    });


    this.chatService.createChat()
    return updateAddUser;
  }
}
