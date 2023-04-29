import { injectable } from "inversify";
import { ApiGatewayManagementApi } from "@aws-sdk/client-apigatewaymanagementapi";
import { config } from "dotenv";
import { IUser } from "../../../domain/user/interface/IUser.interface";
config();

@injectable()
export class WebsocketRepository {
  private readonly _websocket: ApiGatewayManagementApi;

  constructor() {
    this._websocket = new ApiGatewayManagementApi({
      endpoint: process.env.AWS_WEBSOCKET_URL,
    });
  }

  async joinChatRoomEvent(connectionId: string, user: IUser): Promise<void> {
    await this._websocket.postToConnection({
      ConnectionId: connectionId,
      Data: Buffer.from(
        JSON.stringify({
          action: "JOIN ROOM",
          message: `${user.fullname} is joined`,
          user_authentication: user.authenticated_method,
        })
      ),
    });
  }

  async leaveChatRoomEvent(connectionId: string, user: IUser): Promise<void> {
    await this._websocket.postToConnection({
      ConnectionId: connectionId,
      Data: Buffer.from(
        JSON.stringify({
          action: "LEAVE ROOM",
          message: `${user.fullname} leave chat room`,
        })
      ),
    });
  }
}
