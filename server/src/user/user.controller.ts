import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Req,
  Version,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "src/auth/decorator/user.decorator";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Version("1")
  @Get("getAllUsers")
  async getAllUsers(@User() user: any) {
    // const user = request.user;
    return this.userService.getAllUsers(user);
  }
}
