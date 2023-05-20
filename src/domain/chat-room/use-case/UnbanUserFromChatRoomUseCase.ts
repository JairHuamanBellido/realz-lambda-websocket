import { inject, injectable } from "inversify";
import { ChatRoomRepository } from "../../../infrastructure/repository/chat-room/ChatRoomRepository";
import { UserRepository } from "../../../infrastructure/repository/user/UserRepository";
import { IUnbanUserChatRoom } from "../interface/IUnbanUserChatRoom.interface";

@injectable()
export class UnbanUserFromChatRoomUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatroomRepository: ChatRoomRepository,
    @inject(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}

  async execute(payload: IUnbanUserChatRoom) {
    const user = await this._userRepository.findById(payload.user_id);
    if (!user) {
      return new Error("User not found");
    }
    let chatroom = await this._chatroomRepository.getById(payload.chatroom_id);

    if (!chatroom) {
      return new Error("Chatroom not found");
    }

    await this._chatroomRepository.updateBanList({
      ...chatroom,
      ban_list: [
        ...chatroom.ban_list.filter((userId) => userId !== payload.user_id),
      ],
    });
  }
}
