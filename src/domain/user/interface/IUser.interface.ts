import { EnumUserAuthenticatedMethod } from "../enum/user-authenticated-method.enum";

export interface IUser {
  readonly id: string;
  readonly fullname: string;
  readonly email: string;
  readonly authenticated_method: EnumUserAuthenticatedMethod;
  readonly connection_id: string;
}
