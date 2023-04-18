import { inject, injectable } from "inversify";
import { ChatRoomRepository } from "../../../infrastructure/repository/chat-room/ChatRoomRepository";
import { IChatRoom } from "../interface/IChatRoom.interface";

@injectable()
export class GetAllChatRoomsUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatRoomRepository: ChatRoomRepository
  ) {}

  async execute(): Promise<IChatRoom[]> {
    return await this._chatRoomRepository.getAll();
  }
}
