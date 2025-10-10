import { Friendship } from "@prisma/client";

export class FriendshipEntity implements Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: string;
  createdAt: Date;
}
