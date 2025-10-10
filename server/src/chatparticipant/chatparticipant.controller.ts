import {
  Controller,
} from '@nestjs/common';
import { ChatParticipantService } from './chatparticipant.service';

@Controller('chatparticipant')
export class ChatParticipantController {
  constructor(private readonly chatParticipantService: ChatParticipantService) {}


}
