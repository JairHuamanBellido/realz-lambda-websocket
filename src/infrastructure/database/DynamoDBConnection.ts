import { injectable } from "inversify";
import { DynamoDB } from "aws-sdk";
import { IDynamoDBRepository } from "../interfaces/IDynamoDBRepository.interface";

@injectable()
export abstract class DynamoDBRepository<T> implements IDynamoDBRepository<T> {
  public readonly db: DynamoDB.DocumentClient;
  constructor() {
    this.db = new DynamoDB.DocumentClient({
      apiVersion: "2012-08-10",
      region: "us-east-2",
    });
  }

  abstract create(payload: T): Promise<T>;
}
