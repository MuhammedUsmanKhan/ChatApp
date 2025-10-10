import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateChatParticipantDto  {
  @ApiProperty({
    description: "The username of the user",
    example: "johndoe",
  })
  @IsString()
  @IsNotEmpty()
   userId: string;

  @ApiProperty({
    description: "The email of the user",
    example: "johndoe@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
 friendId: string;
  

  @ApiProperty({
    description:
      "Enter new minimum 8 digit password following the pattern shown in example",
    example: "12345678Aa@",
  })
  @IsNotEmpty()
  status: string;
}
