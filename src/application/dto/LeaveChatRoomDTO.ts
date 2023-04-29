import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class LeaveChatRoomDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  chatroom_id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
