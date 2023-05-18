import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class BanUserChatRoomDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  chatroom_id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  user_id: string;
}
