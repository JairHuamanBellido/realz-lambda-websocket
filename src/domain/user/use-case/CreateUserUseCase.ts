import { inject, injectable } from "inversify";
import { UserRepository } from "../../../infrastructure/repository/user/UserRepository";
import { CreateUserDTO } from "../../../application/dto/CreateUserDTO";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}

  async execute(user: CreateUserDTO) {
    return await this._userRepository.create({
      authenticated_method: user.authenticated_method,
      connection_id: "",
      email: user.email,
      fullname: user.name,
      id: user.id,
    });
  }
}
