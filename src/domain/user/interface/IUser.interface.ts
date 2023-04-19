import { EnumUserAuthenticatedMethod } from "../enum/user-authenticated-method.enum";

export interface IUser {
  readonly id: string;
  readonly name: string;
  readonly authenticated_method: EnumUserAuthenticatedMethod;
}
