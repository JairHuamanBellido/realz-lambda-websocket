import { inject, injectable } from "inversify";
import { UserRepository } from "../../../infrastructure/repository/user/UserRepository";
import { ChatRoomRepository } from "../../../infrastructure/repository/chat-room/ChatRoomRepository";
import { IChatRoom } from "../interface/IChatRoom.interface";
import { WebsocketRepository } from "../../../infrastructure/repository/websocket/WebsocketRepository";
import { ILeaveChatRoomUseCase } from "../interface/ILeaveChatRoomUseCase.interface";

@injectable()
export class LeaveChatRoomUseCase {
  constructor(
    @inject(UserRepository)
    private readonly _userRepository: UserRepository,
    @inject(ChatRoomRepository)
    private readonly _chatRoomRepository: ChatRoomRepository,
    @inject(WebsocketRepository)
    private readonly _websocketRepository: WebsocketRepository
  ) {}

  async execute({ chatroom_id, user_id }: ILeaveChatRoomUseCase) {
    const userTarget = await this._userRepository.findById(user_id);

    if (!userTarget) {
      return new Error("Not founded");
    }

    let chatroom = await this._chatRoomRepository.getById(chatroom_id);

    if (!chatroom_id) {
      return new Error("Not founded");
    }

    const newConnected = chatroom.connected.filter(
      (user) => user.id !== user.id
    );

    const newChatRooom: IChatRoom = {
      ...chatroom,
      connected: newConnected,
    };

    const chatRoomUpdated = await this._chatRoomRepository.updateConnectionIds(
      newChatRooom
    );

    for await (const user of chatRoomUpdated.connected) {
      await this._websocketRepository.leaveChatRoomEvent(
        user.connection_id,
        userTarget
      );
    }
  }
}
