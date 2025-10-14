import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateMessageDto {
  @ApiProperty({
    description: "The email of the user",
    example: "johndoe@gmail.com",
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  chatId: string;

  @ApiProperty({
    description: "The email of the user",
    example: "johndoe@gmail.com",
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
