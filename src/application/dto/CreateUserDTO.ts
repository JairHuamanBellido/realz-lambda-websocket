import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}
