import { EnumUserAuthenticatedMethod } from "../enum/user-authenticated-method.enum";

export interface IUser {
  readonly id: string;
  readonly fullname: string;
  readonly authenticated_method: EnumUserAuthenticatedMethod;
  readonly connectionId: string;
}
