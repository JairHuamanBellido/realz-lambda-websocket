import { Container } from "inversify";
import { UserRepository } from "../../infrastructure/repository/user/UserRepository";
import { ChatRoomRepository } from "../../infrastructure/repository/chat-room/ChatRoomRepository";
import { WebsocketRepository } from "../../infrastructure/repository/websocket/WebsocketRepository";

const DIcontainer = new Container();

DIcontainer.bind<UserRepository>(UserRepository).toSelf();
DIcontainer.bind<ChatRoomRepository>(ChatRoomRepository).toSelf();
DIcontainer.bind<WebsocketRepository>(WebsocketRepository).toSelf();
export { DIcontainer };
