import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { DIcontainer } from "../core/di/di-container";
import { JoinChatRoomUseCase } from "../domain/chat-room/use-case/JoinChatRoomUseCase";
import { plainToInstance } from "class-transformer";
import { JoinChatRoomDTO } from "../application/dto/JoinChatRoomDTO";
import isValidSchema from "../application/validator/SchemaValidator";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const userJoinChatRoom = plainToInstance(
      JoinChatRoomDTO,
      JSON.parse(event.body)
    );
    const isValidBody = await isValidSchema(userJoinChatRoom);

    if (typeof isValidBody === "boolean") {
      const connectionId = event.requestContext.connectionId || "";
      const { chatroom_id, user_id } = JSON.parse(
        event.body
      ) as JoinChatRoomDTO;

      await DIcontainer.resolve(JoinChatRoomUseCase).execute({
        chatroom_id,
        user_id,
        connection_id: connectionId,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Joined successfully " }),
      };
    }

    return {
      statusCode: 400,
      body: isValidBody,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
