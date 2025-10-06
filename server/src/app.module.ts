//app.module.ts
import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './auth/guard/jwt-auth.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { MailerModule } from './mailer/mailer.module';
import { ChatModule } from './chat/chat.module';
import { NotificationModule } from './notification/notification.module';
import configuration from './config/env/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true , cache: true,
      load: [configuration],}),
    UserModule,
    AuthModule,
    PrismaModule,
    UserModule,
    MailerModule,
    ChatModule,
    NotificationModule,
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
