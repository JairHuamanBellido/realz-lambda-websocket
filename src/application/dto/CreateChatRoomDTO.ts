import {
  IsArray,
  IsDefined,
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class CreateChatRoomDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  owner_id: string;

  @IsArray()
  @IsEmpty()
  @IsOptional()
  black_list_words?: Array<string>;
}
