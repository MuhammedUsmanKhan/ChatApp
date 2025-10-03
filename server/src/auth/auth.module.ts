// auth.module.ts
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UserModule } from "src/user/user.module";
import { MailerModule } from "src/mailer/mailer.module";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { UserService } from "src/user/user.service";
import { MailerService } from "src/mailer/mailer.service";
import { AuthRefreshTokenService } from "./auth-refresh-token.service";
import { EnvironmentVariables } from "src/config/env/configuration";
import { JwtRefreshStrategy } from "./strategy/jwt-refresh.stragety";

@Module({
  imports: [
    UserModule,
    MailerModule,
    // Access Token JwtModule
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<EnvironmentVariables>) => {
        return {
          secret: configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
          signOptions: {
            expiresIn: Number(
              configService.getOrThrow<string>(
                "ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC"
              )
            ),
          },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRefreshTokenService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    UserService,
    MailerService,
  ],
  exports: [AuthService, AuthRefreshTokenService, JwtModule],
})
export class AuthModule {}
