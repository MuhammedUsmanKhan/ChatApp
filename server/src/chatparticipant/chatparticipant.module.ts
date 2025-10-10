import { Module } from '@nestjs/common';
import { ChatParticipantController } from './chatparticipant.controller';
import { ChatParticipantService } from './chatparticipant.service';

@Module({
    controllers:[ChatParticipantController],
    providers:[ChatParticipantService]
})
export class ChatParticipantModule {}
