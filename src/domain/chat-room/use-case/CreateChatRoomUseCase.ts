import { inject, injectable } from "inversify";
import { ChatRoomRepository } from "../../../infrastructure/repository/chat-room/ChatRoomRepository";
import { IChatRoom } from "../interface/IChatRoom.interface";
import { v4 as uuidv4 } from "uuid";
import { CreateChatRoomDTO } from "../../../application/dto/CreateChatRoomDTO";

@injectable()
export class CreateChatRoomUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatRoomRepository: ChatRoomRepository
  ) {}

  async execute(chatRoom: CreateChatRoomDTO): Promise<IChatRoom> {
    const newChatRoom: IChatRoom = {
      id: uuidv4(),
      owner_id: chatRoom.owner_id,
      title: chatRoom.title,
      black_list_words: chatRoom.black_list_words || [],
      connections_ids: [],
    };
    const chatroomxyz = await this._chatRoomRepository.create(newChatRoom);
    
    return chatroomxyz;
  }
}
