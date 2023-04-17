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
        UpdateExpression: "SET fullname = :fullname",
        ExpressionAttributeValues: {
          ":fullname": { S: payload.name },
        },
      })
      .then((res) => unmarshall(res.Attributes) as IUser);
    console.log(res);
    return res;
  }
}
