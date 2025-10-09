import {
  Controller,
} from '@nestjs/common';
import { FriendshipService } from './friendship.service';

@Controller('friendship')
export class FriendshipController {
  constructor(private readonly userService: FriendshipService) {}


}
