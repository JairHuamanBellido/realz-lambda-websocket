import { inject, injectable } from "inversify";
import { ChatRoomRepository } from "../../../infrastructure/repository/chat-room/ChatRoomRepository";
import { IChatRoom } from "../interface/IChatRoom.interface";

@injectable()
export class FindChatRoomByIdUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatroomRepository: ChatRoomRepository
  ) {}

  async execute(id: string): Promise<IChatRoom | Error> {
    const chatRoom = await this._chatroomRepository.getById(id);

    if (!chatRoom) {
      return new Error("Chat room not founded");
    }
    return chatRoom;
  }
}
