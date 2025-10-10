import { ChatParticipant } from "@prisma/client";

export class ChatParticipantEntity implements ChatParticipant {
    id: string;
    chatId: string;
    userId: string;
    joinedAt: Date;
}
