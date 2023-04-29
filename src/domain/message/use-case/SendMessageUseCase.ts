import { inject, injectable } from "inversify";
import { ChatRoomRepository } from "../../../infrastructure/repository/chat-room/ChatRoomRepository";
import { v4 as uuidv4 } from "uuid";
import { CreateMessageDTO } from "../../../application/dto/CreateMessageDTO";
import { IMessage } from "../interface/IMessage.interface";
import { UserRepository } from "../../../infrastructure/repository/user/UserRepository";
import { WebsocketRepository } from "../../../infrastructure/repository/websocket/WebsocketRepository";

@injectable()
export class SendMessageUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatRoomRepository: ChatRoomRepository,

    @inject(UserRepository)
    private readonly _userRepository: UserRepository,

    @inject(WebsocketRepository)
    private readonly _websocketRepository: WebsocketRepository
  ) {}

  async execute({ chatroom_id, sender_id, text }: CreateMessageDTO) {
    const message: IMessage = {
      id: uuidv4(),
      sender_id,
      text,
    };

    const user = await this._userRepository.findById(sender_id);

    const chatRoom = await this._chatRoomRepository.getById(chatroom_id);

    if (!chatRoom) {
      return new Error("Chat room not found");
    }

    await this._chatRoomRepository.updateMessages({
      ...chatRoom,
      messages: [...chatRoom.messages, message],
    });

    for await (const connectionId of chatRoom.connections_ids) {
      await this._websocketRepository.sendMessageToAllInChatRoom(
        connectionId,
        message,
        user
      );
    }
  }
}
