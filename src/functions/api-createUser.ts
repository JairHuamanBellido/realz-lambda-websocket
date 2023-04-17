import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { CreateUserDTO } from "../application/dto/CreateUserDTO";
import isValidSchema from "../application/validator/SchemaValidator";
import { DIcontainer } from "../core/di/di-container";
import { CreateUserUseCase } from "../domain/user/use-case/CreateUserUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const newUser = plainToInstance(CreateUserDTO, JSON.parse(event.body));
    const isValidBody = await isValidSchema(newUser);
    if (typeof isValidBody === "boolean") {
      const user = await DIcontainer.resolve(CreateUserUseCase).execute(
        newUser
      );
      return {
        statusCode: 201,
        body: JSON.stringify(user),
      };
    }
    return {
      statusCode: 400,
      body: isValidBody,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
