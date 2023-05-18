import { inject, injectable } from "inversify";
import { ChatRoomRepository } from "../../../infrastructure/repository/chat-room/ChatRoomRepository";
import { IBanUserChatRoom } from "../interface/IBanUserChatRoom.interface";
import { UserRepository } from "../../../infrastructure/repository/user/UserRepository";
import { WebsocketRepository } from "../../../infrastructure/repository/websocket/WebsocketRepository";

@injectable()
export class BanUserFromChatRoomUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatRoomRepository: ChatRoomRepository,
    @inject(UserRepository)
    private readonly _userRepository: UserRepository,
    @inject(WebsocketRepository)
    private readonly _websocketRepository: WebsocketRepository
  ) {}

  async execute(payload: IBanUserChatRoom) {
    const user = await this._userRepository.findById(payload.user_id);
    if (!user) {
      return new Error("User not exist");
    }

    let chatroom = await this._chatRoomRepository.getById(payload.chatroom_id);
    if (!chatroom) {
      return new Error("Chatroom not exist");
    }

    await this._chatRoomRepository.updateBanList({
      ...chatroom,
      ban_list: [
        ...chatroom.ban_list.filter((userId) => userId !== payload.user_id),
      ],
    });
    if (!!user.connection_id) {
      await this._websocketRepository.notifyBanUser(user.connection_id);
    }
  }
}
