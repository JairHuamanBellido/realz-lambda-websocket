import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { DIcontainer } from "../core/di/di-container";
import { GetAllChatRoomsUseCase } from "../domain/chat-room/use-case/GetAllChatRoomsUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const chatRooms = await DIcontainer.resolve(
      GetAllChatRoomsUseCase
    ).execute();

    return {
      statusCode: 201,
      body: JSON.stringify(chatRooms),
    };
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
    };
  }
};
