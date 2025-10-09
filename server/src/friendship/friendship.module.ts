import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { FriendshipController } from './friendship.controller';
import { FriendshipService } from './friendship.service';

@Module({
  controllers: [FriendshipController],
  providers: [FriendshipService],
})
export class FriendshipModule {}
