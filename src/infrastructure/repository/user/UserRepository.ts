import { injectable } from "inversify";
import { DynamoDBRepository } from "../../database/DynamoDBConnection";
import { IUser } from "../../../domain/user/interface/IUser.interface";
import { unmarshall } from "@aws-sdk/util-dynamodb";
@injectable()
export class UserRepository extends DynamoDBRepository<IUser> {
  private readonly tableName: string = "realz-users";

  async create(payload: IUser): Promise<IUser> {
    const res = await this.db
      .updateItem({
        Key: {
          id: { S: payload.id },
        },
        TableName: this.tableName,
        ReturnValues: "ALL_NEW",
        UpdateExpression:
          "SET fullname = :fullname, authenticated_method = :authenticated_method, email = :email",
        ExpressionAttributeValues: {
          ":fullname": { S: payload.fullname },
          ":authenticated_method": { S: payload.authenticated_method },
          ":email": { S: payload.email },
        },
      })
      .then((res) => unmarshall(res.Attributes) as IUser);
    return res;
  }

  async updateConnectionId(payload: IUser): Promise<IUser> {
    const res = await this.db
      .updateItem({
        Key: {
          id: { S: payload.id },
        },
        TableName: this.tableName,
        ReturnValues: "ALL_NEW",
        UpdateExpression: "SET connection_id = :connection_id",
        ExpressionAttributeValues: {
          ":connection_id": { S: payload.connection_id },
        },
      })
      .then((res) => unmarshall(res.Attributes) as IUser);

    return res;
  }

  async findById(id: string): Promise<IUser | undefined> {
    const user = await this.db
      .scan({
        TableName: this.tableName,
        FilterExpression: "id = :id",
        ExpressionAttributeValues: {
          ":id": { S: id },
        },
      })
      .then((res) => res.Items.map((item) => unmarshall(item) as IUser));

    return user[0];
  }
}
