//app.module.ts
import { Module } from "@nestjs/common";
// import { AppController } from './app.controller';
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { JwtStrategy } from "./auth/strategy/jwt.strategy";
import { APP_GUARD } from "@nestjs/core";
import { JwtGuard } from "./auth/guard/jwt-auth.guard";
import { PrismaModule } from "./prisma/prisma.module";
import { UserModule } from "./user/user.module";
import { MailerModule } from "./mailer/mailer.module";
import { ChatModule } from "./chat/chat.module";
import { NotificationModule } from "./notification/notification.module";
import { FriendshipModule } from "./friendship/friendship.module";
import { ChatParticipantModule } from "./chatparticipant/chatparticipant.module";
import configuration from "./config/env/configuration";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    AuthModule,
    PrismaModule,
    UserModule,
    MailerModule,
    ChatModule,
    NotificationModule,
    FriendshipModule,
    ChatParticipantModule,
    MessageModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
