export interface IDynamoDBRepository<T> {
  create(payload: T): Promise<T>;
}
