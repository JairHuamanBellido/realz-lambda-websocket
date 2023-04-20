import { inject, injectable } from "inversify";
import { ChatRoomRepository } from "../../../infrastructure/repository/chat-room/ChatRoomRepository";
import { IChatRoom } from "../interface/IChatRoom.interface";
import { IJoinChatRoomUseCase } from "../interface/IJoinChatRoomUseCase.interface";
import { UserRepository } from "../../../infrastructure/repository/user/UserRepository";
import { WebsocketRepository } from "../../../infrastructure/repository/websocket/WebsocketRepository";

@injectable()
export class JoinChatRoomUseCase {
  constructor(
    @inject(ChatRoomRepository)
    private readonly _chatRoomRepository: ChatRoomRepository,
    @inject(UserRepository)
    private readonly _userRepository: UserRepository,
    @inject(WebsocketRepository)
    private readonly _websocketRepository: WebsocketRepository
  ) {}

  async execute({
    chatroom_id,
    connection_id,
    user_id,
  }: IJoinChatRoomUseCase): Promise<IChatRoom | undefined> {
    try {
      // Validate if chat room exist
      const chatRoom = await this._chatRoomRepository.getById(chatroom_id);

      if (!chatRoom) {
        return undefined;
      }

      // Validate if user exist
      const userTarget = await this._userRepository.findById(user_id);

      if (!userTarget) {
        return undefined;
      }

      // Update connectionId of User
      await this._userRepository.updateConnectionId({
        ...userTarget,
        connectionId: connection_id,
      });

      // Notify all the users in the chat room
      chatRoom.connections_ids.forEach(async (connectionId: string) => {
        await this._websocketRepository.joinChatRoomEvent(
          connectionId,
          userTarget
        );
      });

      // Update connection ids of chat rooms
      await this._chatRoomRepository.updateConnectionIds({
        ...chatRoom,
        connections_ids: [...chatRoom.connections_ids, connection_id],
      });
      return chatRoom;
    } catch (error) {
      console.error(error);
    }
  }
}
