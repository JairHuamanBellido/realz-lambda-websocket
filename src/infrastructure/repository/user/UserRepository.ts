import { injectable } from "inversify";
import { DynamoDBRepository } from "../../database/DynamoDBConnection";
import { IUser } from "../../../domain/user/interface/IUser.interface";

@injectable()
export class UserRepository extends DynamoDBRepository<IUser> {
  private readonly tableName: string = "realz-users";

  async create(payload: IUser): Promise<IUser> {
    const res = (await (
      await this.db
        .put({
          TableName: this.tableName,
          Item: payload,
        })
        .promise()
    ).Attributes) as IUser;

    return res;
  }
}
