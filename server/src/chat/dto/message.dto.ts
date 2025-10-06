export class MessageDto {
  id: string;
  content: string;
  chatId: string;
  senderId: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM';
  createdAt: Date;

  // For client-side display
  sender?: {
    id: string;
    name: string;
    email: string;
  };
}

export class SendMessageDto {
  content: string;
  chatId: string;
  messageType: 'TEXT' | 'IMAGE' | 'FILE' = 'TEXT';
}

export class DeleteMessageDto {
  messageId: string;
  chatId: string;
}

export class CreateChatDto {
  participantIds: string[];
  name?: string;
  isGroup: boolean = false;
}