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
    const user = await this._userRepository.findById(user_id);

    if (!user) {
      return new Error("Not founded");
    }

    let chatroom = await this._chatRoomRepository.getById(chatroom_id);

    if (!chatroom_id) {
      return new Error("Not founded");
    }

    const newConnectionIds = chatroom.connections_ids.filter(
      (connection) => connection !== user.connection_id
    );

    const newChatRooom: IChatRoom = {
      ...chatroom,
      connections_ids: newConnectionIds,
    };

    const chatRoomUpdated = await this._chatRoomRepository.updateConnectionIds(
      newChatRooom
    );

    chatRoomUpdated.connections_ids.forEach(async (connectionId: string) => {
      await this._websocketRepository.leaveChatRoomEvent(connectionId, user);
    });
  }
}
