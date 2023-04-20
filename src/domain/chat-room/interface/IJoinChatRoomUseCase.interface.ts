export interface IJoinChatRoomUseCase {
  readonly chatroom_id: string;
  readonly user_id: string;
  readonly connection_id: string;
}
