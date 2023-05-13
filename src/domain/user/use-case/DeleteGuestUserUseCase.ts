import { inject, injectable } from "inversify";
import { UserRepository } from "../../../infrastructure/repository/user/UserRepository";
import { EnumUserAuthenticatedMethod } from "../enum/user-authenticated-method.enum";

@injectable()
export class DeleteGuestUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}

  async execute(connectionId: string) {
    const user = await this._userRepository.findByConnectionId(connectionId);

    if (!user) {
      throw new Error();
    }

    if (user.authenticated_method === EnumUserAuthenticatedMethod.GUEST) {
      await this._userRepository.delete(user.id);
    }
  }
}
