import { $Enums, Friendship } from "@prisma/client";

export class FriendshipEntity implements Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: $Enums.FriendshipStatus;
  createdAt: Date;
}
