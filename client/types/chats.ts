// // src/types/chat.ts

// // User type (shared across multiple responses)
// export type UserResponse = {
//   id: string;
//   username: string;
//   email: string;
// };

// // Participant with user info
// export type ParticipantResponse = {
//   user: UserResponse;
// };

// // Message responses
// export type MessageResponse = {
//   id: string;
//   content: string;
//   chatId: string;
//   senderId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   sender: UserResponse;
//   // For sendMessage only - includes chat
//   chat?: ChatResponse;
// };

// // Chat responses
// export type ChatResponse = {
//   id: string;
//   name: string | null;
//   isGroup: boolean;
//   createdAt: Date;
//   updatedAt: Date;
//   participants: ParticipantResponse[];
//   // For getUserChats only - includes last message preview
//   messages?: MessageResponse[];
// };

// // Array types for lists
// export type ChatsResponse = ChatResponse[];
// export type MessagesResponse = MessageResponse[];

// // Input types
// export type SendMessageInput = {
//   chatId: string;
//   content: string;
// };

// export type CreateChatInput = {
//   participantIds: string[];
//   name?: string;
// };

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export interface Chat {
  id: string;
  name?: string;
  isGroup: boolean;
  participants: User[];
  lastMessage?: Message;
}