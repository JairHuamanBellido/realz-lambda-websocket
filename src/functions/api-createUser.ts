import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { CreateUserDTO } from "../application/dto/CreateUserDTO";
import isValidSchema from "../application/validator/SchemaValidator";
import { DIcontainer } from "../core/di/di-container";
import { CreateUserUseCase } from "../domain/user/use-case/CreateUserUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const newUser = plainToInstance(CreateUserDTO, event);
    const isValidBody = await isValidSchema(newUser);
    await DIcontainer.resolve(CreateUserUseCase).execute(newUser);
    if (typeof isValidBody === "boolean") {
      return {
        statusCode: 201,
        body: JSON.stringify({ hello: "world" }),
      };
    }
    return {
      statusCode: 400,
      body: isValidBody,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
    };
  }
};
