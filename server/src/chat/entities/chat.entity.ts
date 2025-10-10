import { Chat} from "@prisma/client";

export class ChatEntity implements Chat {
    id: string;
    name: string;
    isGroup: boolean;
    createdAt: Date;
    updatedAt: Date;
}
