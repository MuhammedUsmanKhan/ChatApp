import { Body, Controller, Param, Patch, Post, Version } from "@nestjs/common";
import { MessageService } from "./message.service";

@Controller("message")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}


}
