import { Container } from "inversify";
import { UserRepository } from "../../infrastructure/repository/user/UserRepository";
import { ChatRoomRepository } from "../../infrastructure/repository/chat-room/ChatRoomRepository";

const DIcontainer = new Container();

DIcontainer.bind<UserRepository>(UserRepository).toSelf();
DIcontainer.bind<ChatRoomRepository>(ChatRoomRepository).toSelf();
export { DIcontainer };
