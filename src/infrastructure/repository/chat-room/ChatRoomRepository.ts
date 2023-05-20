import { injectable } from "inversify";
import { DynamoDBRepository } from "../../database/DynamoDBConnection";
import { IChatRoom } from "../../../domain/chat-room/interface/IChatRoom.interface";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
@injectable()
export class ChatRoomRepository extends DynamoDBRepository<IChatRoom> {
  private readonly tableName: string = "realz-chatrooms";

  async create(payload: IChatRoom): Promise<IChatRoom> {
    const res = await this.db
      .updateItem({
        Key: {
          id: { S: payload.id },
        },
        TableName: this.tableName,
        ReturnValues: "ALL_NEW",
        UpdateExpression:
          "SET owner_id = :owner_id, title = :title, black_list_words = :black_list_words, connected = :connected",
        ExpressionAttributeValues: {
          ":owner_id": { S: payload.owner_id },
          ":title": { S: payload.title },
          ":black_list_words": { L: payload.black_list_words as [] },
          ":connected": { L: payload.connected as [] },
        },
      })
      .then((res) => unmarshall(res.Attributes) as IChatRoom);

    return res;
  }

  async getAll(): Promise<IChatRoom[]> {
    const rooms = await this.db
      .scan({
        TableName: this.tableName,
      })
      .then((res) => res.Items.map((item) => unmarshall(item) as IChatRoom));

    return rooms;
  }

  async getById(id: string): Promise<IChatRoom | undefined> {
    const chatroom = await this.db
      .scan({
        TableName: this.tableName,
        FilterExpression: "id = :id",
        ExpressionAttributeValues: {
          ":id": { S: id },
        },
      })
      .then((res) => res.Items.map((item) => unmarshall(item) as IChatRoom));

    return chatroom[0] || undefined;
  }

  async updateConnectionIds(payload: IChatRoom): Promise<IChatRoom> {
    const chatroom = await this.db
      .updateItem({
        Key: {
          id: { S: payload.id },
        },
        TableName: this.tableName,
        ReturnValues: "ALL_NEW",
        UpdateExpression: "SET connected = :connected",
        ExpressionAttributeValues: {
          ":connected": {
            L: marshall(payload.connected) as any,
          },
        },
      })
      .then((res) => unmarshall(res.Attributes) as IChatRoom);

    return chatroom;
  }

  async updateMessages(payload: IChatRoom): Promise<IChatRoom> {
    const chatRoom = await this.db
      .updateItem({
        Key: {
          id: { S: payload.id },
        },
        TableName: this.tableName,
        ReturnValues: "ALL_NEW",
        UpdateExpression: "SET messages = :messages",
        ExpressionAttributeValues: {
          ":messages": {
            L: marshall(payload.messages) as any,
          },
        },
      })
      .then((res) => unmarshall(res.Attributes) as IChatRoom);
    return chatRoom;
  }

  async updateBanList(payload: IChatRoom): Promise<IChatRoom> {
    const chatRoom = await this.db
      .updateItem({
        Key: {
          id: { S: payload.id },
        },
        TableName: this.tableName,
        ReturnValues: "ALL_NEW",
        UpdateExpression: "SET ban_list = :ban_list",
        ExpressionAttributeValues: {
          ":ban_list": {
            L: marshall(payload.ban_list) as any,
          },
        },
      })
      .then((res) => unmarshall(res.Attributes) as IChatRoom);

    return chatRoom;
  }
}
