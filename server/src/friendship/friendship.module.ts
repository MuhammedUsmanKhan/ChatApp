import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';
import { ChatModule } from 'src/chat/chat.module';
import { ChatService } from 'src/chat/chat.service';

@Module({
  imports:[ChatModule],
  controllers: [FriendshipController],
  providers: [FriendshipService, ChatService],
})
export class FriendshipModule {}
