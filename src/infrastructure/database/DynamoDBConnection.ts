import { injectable } from "inversify";
import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { IDynamoDBRepository } from "../interfaces/IDynamoDBRepository.interface";

@injectable()
export abstract class DynamoDBRepository<T> implements IDynamoDBRepository<T> {
  public readonly db: DynamoDB;
  constructor() {
    this.db = new DynamoDB({
      region: "us-east-2",
    });
  }

  abstract create(payload: T): Promise<T>;
}
