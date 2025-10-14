import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { FriendshipStatus } from "../enum/friendship-status.enum";



export class UpdateFriendshipDto {
  // @ApiProperty({
  //   description: "The username of the user",
  //   example: "johndoe",
  // })
  // @IsString()
  // @IsNotEmpty()
  // userId: string;

  // @ApiProperty({
  //   description: "The email of the user",
  //   example: "johndoe@gmail.com",
  // })
  // @IsString()
  // @IsNotEmpty()
  // friendId: string;

  @IsNotEmpty()
  status: FriendshipStatus;
}
