import { inject, injectable } from "inversify";
import { UserRepository } from "../../../infrastructure/repository/user/UserRepository";
import { IUser } from "../interface/IUser.interface";

@injectable()
export class FindUserByIdUseCase {
  constructor(
    @inject(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<IUser> {
    return await this._userRepository.findById(id);
  }
}
