import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  Version,
  HttpCode,
  UseGuards,
  // Response,
  Res,
  Req,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthRefreshTokenService } from "./auth-refresh-token.service";
import { AuthService } from "./auth.service";
import { ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "./decorator/public.decorator";
import { SignUpUserDto } from "./dto/signup-user.dto";
import { UserDto } from "./dto/user.dto";
import { SignInUserDto } from "./dto/signin-user.dto";
import { LocalAuthGuard } from "./guard/jwt-local-auth.guard";
import { AccountVerificationUserDto } from "./dto/account-verification-user.dto";
import { ForgetPasswordUserDto } from "./dto/forgetpassword-user.dto.";
import { ChangePasswordDto } from "./dto/changepassword-user.dto";
import { ResendOtpDto } from "./dto/resend.otp.dto";
import { JwtRefreshAuthGuard } from "./guard/jwt-refresh-auth.guard";
import { User } from "./decorator/user.decorator";
import { Request, Response } from "express";

@Public()
@ApiTags("Authentication")
@Controller("auth")
export class AuthController {
  constructor(
    // private readonly userService: UserService,
    private readonly authRefreshTokenService: AuthRefreshTokenService,
    private readonly authService: AuthService
  ) {}

  // sign up swagger
  @ApiBody({
    description: "User registration details",
    type: SignUpUserDto,
  })
  @ApiResponse({
    status: 201,
    description: "User successfully registered",
    schema: {
      example: {
        full_name: "usman Khan",
        email: "usman2124@gmail.com",
        email_verified: false,
        createdAt: "2024-09-16T08:16:40.901Z",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Bad request, e.g., invalid input",
    schema: {
      example: {
        message: [
          "email must be an email",
          "Password must contain at least one lowercase letter",
          "password should not be empty",
        ],
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: "Conflict, e.g., user already exists",
    schema: {
      example: {
        message: "Email already exists",
        error: "Conflict",
        statusCode: 409,
      },
    },
  })

  // sign up controller
  @Version("1")
  @Post("signup")
  // @UsePipes(ValidationPipe)
  signup(
    @Body() signUpUserDto: SignUpUserDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<UserDto> {
    return this.authService.signup(signUpUserDto, res);
  }

  // signin swagger

  @ApiBody({
    description: "User credentials to sign in",
    type: SignInUserDto,
  })
  @ApiResponse({
    status: 200,
    description: "User successfully logged in",
    schema: {
      example: {
        full_name: "Shakil Khan",
        email: "shakil@gmail.com",
        email_verified: true,
        createdAt: "2024-09-14T08:48:47.651Z",
        message: "Logged in successfully",
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid input",
    schema: {
      example: {
        message: "email or passoword is not correct",
        error: "Unauthorized",
        statusCode: 401,
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: "Unauthorized",
    schema: {
      example: {
        message: "email or passoword is not correct",
        error: "Unauthorized",
        statusCode: 401,
      },
    },
  })

  // signin controller
  @Version("1")
  @Post("signin")
  @HttpCode(200)
  // @UsePipes(ValidationPipe)
  @UseGuards(LocalAuthGuard)
  login(@User() user: any, @Res({ passthrough: true }) res: Response) {
    // const user = request.user;

    console.log({ user });
    return this.authService.login(user, res);
  }

  // account verification swagger

  @ApiBody({
    description: "Otp and email for user account verification ",
    type: AccountVerificationUserDto,
  })
  @ApiResponse({
    status: 404,
    description: "Invalid Otp code",
    schema: {
      example: {
        message: "Otp code not found",
        error: "Not Found",
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Invalid code or email",
    schema: {
      example: {
        message: ["code should not be empty", "email must be an email"],
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "User account has been verified",
    schema: {
      example: {
        full_name: "usman Khan",
        email: "uk@gmail.com",
        email_verified: true,
        createdAt: "2024-09-16T14:47:37.441Z",
      },
    },
  })
  // account verification controller
  @Version("1")
  @Patch("account-verification")
  // @UsePipes(ValidationPipe)
  verifyEmail(
    @Body() accountVerificationUserDto: AccountVerificationUserDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.verifyEmail(accountVerificationUserDto, res);
  }

  //verify Otp After Forget Password swagger

  @ApiBody({
    description: "Otp and email for user verification for changing password",
    type: AccountVerificationUserDto,
  })
  // @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 404,
    description: "Email not found",
    schema: {
      example: {
        message: "Enter Valid Email",
        error: "Not Found",
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Otp field could not be left empty",
    schema: {
      example: {
        message: ["code should not be empty"],
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Otp doesnt match",
    schema: {
      example: {
        message: "Enter Valid Otp Code",
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })

  //verify Otp After Forget Password controller
  @Version("1")
  @Patch("verify-otp")
  verifyOtpAfterForgetPassword(
    @Body() accountVerificationUserDto: AccountVerificationUserDto
  ) {
    return this.authService.verifyOtpAfterForgetPassword(
      accountVerificationUserDto
    );
  }

  //send Otp on forget password swagger

  @ApiBody({
    description: "email for sending Otp",
    type: ForgetPasswordUserDto,
  })
  @ApiResponse({
    status: 404,
    description: "User email not found",
    schema: {
      example: {
        message: "User email not found",
        error: "Not Found",
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 409,
    description: "Otp can be send only once",
    schema: {
      example: {
        message: "Otp has been already send to this email",
        error: "Conflict",
        statusCode: 409,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Pattern of the email doesnt match",
    schema: {
      example: {
        message: ["email must be an email"],
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "succesfully sent Otp to the email",
    example: true,
  })
  //send Otp on forget password controller
  @Version("1")
  @Get("forget-password")
  // @UsePipes(ValidationPipe)
  sendOtpOnforgetPassword(
    @Body() forgetPasswordUserDto: ForgetPasswordUserDto
  ) {
    return this.authService.sendOtpOnForgetPassword(forgetPasswordUserDto);
  }

  //change password swagger

  @ApiBody({
    description:
      "Otp to Verify user, email to check whether user is valid and a new password",
    type: ChangePasswordDto,
  })
  @ApiResponse({
    status: 409,
    description: "Otp doesnt match",
    schema: {
      example: {
        message: "Enter Valid Otp",
        error: "Conflict",
        statusCode: 409,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: "invalid email or password",
    schema: {
      example: {
        message: "Enter Valid Email",
        error: "Not Found",
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "invalid email or password",
    schema: {
      example: {
        message: [
          "Password must contain at least one lowercase letter",
          "email must be an email",
          "password should not be empty",
        ],
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Password has succesfully changed",
    schema: {
      example: true,
    },
  })

  //change password controller
  @Version("1")
  @Patch("change-password")
  // @UsePipes(ValidationPipe)
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  //resend Otp sawgger

  @ApiBody({
    description: "User email to sent an Otp",
    type: ResendOtpDto,
  })
  @ApiResponse({
    status: 404,
    description: "Email not found",
    schema: {
      example: {
        message: "Enter Valid Email",
        error: "Not Found",
        statusCode: 404,
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: "Pattern of the email doesnt match",
    schema: {
      example: {
        message: ["email must be an email"],
        error: "Bad Request",
        statusCode: 400,
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "Password has succesfully changed",
    schema: {
      example: {
        id: "f7cb8e90-5db1-49cf-8e00-e02787122273",
        code: "$2b$10$.iELnd7l1/7ETlD5wTBXvubDHE2gfz664F.DxvgBsxZ3cezkDAyR.",
        type: "email_verification",
        user_id: "c23885d2-96ac-4764-b455-5d4aecdebf85",
        limit: 8,
        createdAt: "2024-09-16T15:22:57.155Z",
        updatedAt: "2024-09-16T15:22:57.155Z",
      },
    },
  })

  //resend Otp controller
  @Version("1")
  @Get("resend-otp")
  // @UsePipes(ValidationPipe)
  resendOtp(@Body() ResendOtpDto: ResendOtpDto) {
    return this.authService.resendOtp(ResendOtpDto);
  }

  @Public()
  @UseGuards(JwtRefreshAuthGuard)
  @Post("refresh")
  // @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: "Token refreshed successfully" })
  @ApiResponse({ status: 401, description: "Invalid refresh token" })
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ accessToken: string }> {
    return this.authRefreshTokenService.refreshTokens(req, res);
  }

  // @UseGuards(JwtAuthGuard)
  @Post("logout")
  // @ApiOperation({ summary: 'User logout' })
  @ApiResponse({ status: 200, description: "Logout successful" })
  async logout(
    @User("id") userId: string,
    @Res({ passthrough: true }) res: Response
  ): Promise<{ message: string }> {
    await this.authRefreshTokenService.logout(userId, res);
    return { message: "Logged out successfully" };
  }

  // @ApiBody({
  //   description: 'Logout User from the App',
  // })
  // @Version('1')
  // @Get('logout')
  // logout(@Res({ passthrough: true }) res: Response) {
  //   return this.authService.logout(res);
  // }
}

// auth.controller.ts
// import { Controller, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
// import { Request, Response } from 'express';
// import { AuthService } from './auth.service';

// @Controller('auth')
// export class AuthController {
