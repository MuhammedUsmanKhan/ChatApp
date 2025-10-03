import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  Req,
  Request,
  Res,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { comparePassword, encryptPassword } from "src/common/utils/bcrypt";
import {
  generateOtp,
  // removeJwtFromCookie,
  // storingJwtOnCookie,
} from "src/common/utils/helper";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "src/mailer/mailer.service";
import { Response } from "express";

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    // private readonly mailerService: MailerService,
    // private readonly authRefreshTokenService: AuthRefreshTokenService // ✅ inject service
  ) {}


}

// sign up, sign in, logout,  verifyEmail, verifyForgotPassword, forgetPassword changePassword
