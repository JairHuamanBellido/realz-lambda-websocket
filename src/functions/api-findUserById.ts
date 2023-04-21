import {
  APIGatewayEvent,
  APIGatewayProxyEventPathParameters,
} from "aws-lambda";
import "reflect-metadata";
import { DIcontainer } from "../core/di/di-container";
import { FindUserByIdUseCase } from "../domain/user/use-case/FindUserByIdUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const id = (event.pathParameters as APIGatewayProxyEventPathParameters)
      .id as string;

    const user = await DIcontainer.resolve(FindUserByIdUseCase).execute(id);

    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "user not found" }),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(user),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
    };
  }
};
