import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateFriendshipDto } from "./dto/create-friendship.dto";
import { UpdateFriendshipDto } from "./dto/update-friendship.dto";
import { ChatService } from "src/chat/chat.service";
// import { AddFriendDto } from "./dto/add-friend.dto";

@Injectable()
export class FriendshipService {
  constructor(
    private readonly prismaService: PrismaService,
    private chatService: ChatService
  ) {}

  async createFriendship(
    userId: string,
    createFriendshipDto: CreateFriendshipDto
  ) {
    const { friendId } = createFriendshipDto;
    try {
      const checkUserExist = await this.prismaService.user.findMany({
        where: {
          id: {
            in: [userId, friendId],
          },
        },
      });

      if (checkUserExist.length < 2) {
        throw new NotFoundException("Users not found");
      }
      console.log(checkUserExist);

      const checkUserAlreadyExistInFriendlist =
        await this.prismaService.friendship.findUnique({
          where: {
            userId_friendId: {
              userId,
              friendId,
            },
          },
        });

      if (checkUserAlreadyExistInFriendlist) {
        throw new ConflictException("User already added to friend list.");
      }

      const createFriendship = await this.prismaService.friendship.create({
        data: {
          friendId,
          userId,
        },
      });

      return createFriendship;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateFriendship(id: string, updateFriendshipDto: UpdateFriendshipDto) {
    const checkFriendshipExist = await this.prismaService.friendship.findUnique(
      {
        where: {
          id,
        },
      }
    );

    if (!checkFriendshipExist) {
      throw new NotFoundException("Friendship doesnot exists.");
    }

    const updateFriendship = await this.prismaService.friendship.update({
      where: {
        id,
      },
      data: {
        status: updateFriendshipDto.status,
      },
    });

    const createChatDto = {
      userId: updateFriendship.userId,
      friendId: updateFriendship.friendId,
    };

    const chatCreated = await this.chatService.createChat(createChatDto);

    return updateFriendship;
  }
}
