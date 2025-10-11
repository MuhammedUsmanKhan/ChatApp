import { Body, Controller, Param, Patch, Post, Version } from "@nestjs/common";
import { FriendshipService } from "./friendship.service";
import { CreateFriendshipDto } from "./dto/create-friendship.dto";
import { UpdateFriendshipDto } from "./dto/update-friendship.dto";
import { User } from "src/auth/decorator/user.decorator";

@Controller("friendship")
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Version("1")
  @Post("createFriendship")
  async createFriendship(
    @User() user: any,
    @Body() createFriendshipDto: CreateFriendshipDto
  ) {
    return await this.friendshipService.createFriendship(
      user.id,
      createFriendshipDto
    );
  }

  @Version("1")
  @Patch("updateFriendship/:id")
  async updateFriendship(
    @Param("id") id: string,
    @Body() updateFriendshipDto: UpdateFriendshipDto
  ) {
    return await this.friendshipService.updateFriendship(
      id,
      updateFriendshipDto
    );
  }
}
