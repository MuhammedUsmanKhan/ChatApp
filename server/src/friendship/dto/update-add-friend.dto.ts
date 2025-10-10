import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class UpdateAddFriendDto {
  
  @IsNotEmpty()
  status: string;
}
