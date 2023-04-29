import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  sender_id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  chatroom_id: string;
}
