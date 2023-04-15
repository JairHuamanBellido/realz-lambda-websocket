import { Container } from "inversify";
import { UserRepository } from "../../infrastructure/repository/user/UserRepository";

const DIcontainer = new Container();

DIcontainer.bind<UserRepository>(UserRepository).toSelf();

export { DIcontainer };
