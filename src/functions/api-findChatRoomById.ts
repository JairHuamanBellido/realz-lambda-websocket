import "reflect-metadata";
import {
  APIGatewayEvent,
  APIGatewayProxyEventPathParameters,
} from "aws-lambda";
import { DIcontainer } from "../core/di/di-container";
import { FindChatRoomByIdUseCase } from "../domain/chat-room/use-case/FindChatRoomByIdUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const id = (event.pathParameters as APIGatewayProxyEventPathParameters)
      .id as string;

    const chatRoom = await DIcontainer.resolve(FindChatRoomByIdUseCase).execute(
      id
    );

    if (chatRoom instanceof Error) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "chatroom not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(chatRoom),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
    };
  }
};
