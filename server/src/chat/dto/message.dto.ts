

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