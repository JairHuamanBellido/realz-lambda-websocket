import { inject, injectable } from "inversify";
import { ChatRoomRepository } from "../../../infrastructure/repository/chat-room/ChatRoomRepository";
import { IChatRoom } from "../interface/IChatRoom.interface";
import { v4 as uuidv4 } from "uuid";
import { CreateChatRoomDTO } from "../../../application/dto/CreateChatRoomDTO";
import { UserRepository } from "../../../infrastructure/repository/user/UserRepository";
import { EnumUserAuthenticatedMethod } from "../../user/enum/user-authenticated-method.enum";

@injectable()
export class CreateChatRoomUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatRoomRepository: ChatRoomRepository,
    @inject(UserRepository)
    private readonly _userRepository: UserRepository
  ) {}

  async execute(chatRoom: CreateChatRoomDTO): Promise<IChatRoom> {
    const newChatRoom: IChatRoom = {
      id: uuidv4(),
      owner_id: chatRoom.owner_id,
      title: chatRoom.title,
      black_list_words: chatRoom.black_list_words || [],
      connections_ids: [],
      messages: [],
      ban_list:[],
    };
    const owner = await this._userRepository.findById(chatRoom.owner_id);

    if (owner.authenticated_method === EnumUserAuthenticatedMethod.GITHUB) {
      const chatroom = await this._chatRoomRepository.create(newChatRoom);
      return chatroom;
    }
    throw new Error("Guest users can't create chatroom");
  }
}
