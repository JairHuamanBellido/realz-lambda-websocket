import {
  IsDefined,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
} from "class-validator";
import { EnumUserAuthenticatedMethod } from "../../domain/user/enum/user-authenticated-method.enum";
export class CreateUserDTO {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  @IsNotEmpty()
  @IsEnum(EnumUserAuthenticatedMethod, {
    message: "Values must be GITHUB or GUEST",
  })
  authenticated_method: EnumUserAuthenticatedMethod;
}
