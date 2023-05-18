import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { BanUserChatRoomDTO } from "../application/dto/BanUserChatRoomDTO";
import isValidSchema from "../application/validator/SchemaValidator";
import { DIcontainer } from "../core/di/di-container";
import { BanUserFromChatRoomUseCase } from "../domain/chat-room/use-case/BanUserFromChatRoomUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const payload = JSON.parse(event.body);

    const chatRoomDTO = plainToInstance(BanUserChatRoomDTO, payload);

    const isValidBody = await isValidSchema(chatRoomDTO);

    if (typeof isValidBody === "boolean") {
      const chatRoom = await DIcontainer.resolve(
        BanUserFromChatRoomUseCase
      ).execute({
        chatroom_id: chatRoomDTO.chatroom_id,
        user_id: chatRoomDTO.user_id,
      });

      return {
        statusCode: 201,
        body: JSON.stringify({ message: "User banned successfully" }),
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
