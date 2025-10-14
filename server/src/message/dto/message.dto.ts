import { Exclude, Expose } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
import { MessageStatus } from "../enum/message-status.enum";

@Exclude()
export class MessageDto {
  @Expose()
  id: string;

  @Expose()
  content: string;

  @Expose()
  chatId: string;

  @Expose()
  senderId: string;

  @Expose()
  messageType: MessageStatus;

  @Expose()
  createdAt: Date;
}

// export class MessageDto {
//   id: string;
//   content: string;
//   chatId: string;
//   senderId: string;
//   messageType: "TEXT" | "IMAGE" | "FILE" | "SYSTEM";
//   createdAt: Date;

//   // For client-side display
//   sender?: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }
