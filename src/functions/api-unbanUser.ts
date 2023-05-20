import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { UnbanUserChatRoomDTO } from "../application/dto/UnbanUserChatRoomDTO";
import isValidSchema from "../application/validator/SchemaValidator";
import { DIcontainer } from "../core/di/di-container";
import { UnbanUserFromChatRoomUseCase } from "../domain/chat-room/use-case/UnbanUserFromChatRoomUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const payload = JSON.parse(event.body);

    const chatRoomDTO = plainToInstance(UnbanUserChatRoomDTO, payload);

    const isValidBody = await isValidSchema(chatRoomDTO);

    if (typeof isValidBody === "boolean") {
      await DIcontainer.resolve(UnbanUserFromChatRoomUseCase).execute({
        chatroom_id: chatRoomDTO.chatroom_id,
        user_id: chatRoomDTO.user_id,
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "User unbanned successfully" }),
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
