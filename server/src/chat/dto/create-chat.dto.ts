import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateChatDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    description: "The email of the user",
    example: "johndoe@gmail.com",
  })
  @IsString()
  @IsNotEmpty()
  friendId: string;
}
