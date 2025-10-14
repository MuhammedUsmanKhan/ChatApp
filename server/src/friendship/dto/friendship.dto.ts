import { Exclude, Expose } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
import { FriendshipEntity } from "../entities/friendship.entity";
import { FriendshipStatus } from "../enum/friendship-status.enum";

@Exclude()
export class FriendshipDto {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  friendId: string;

  @Expose()
  status: FriendshipStatus;

  @Expose()
  createdAt: Date;
}
