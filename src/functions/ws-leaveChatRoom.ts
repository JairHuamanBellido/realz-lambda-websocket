import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { LeaveChatRoomDTO } from "../application/dto/LeaveChatRoomDTO";
import isValidSchema from "../application/validator/SchemaValidator";
import { DIcontainer } from "../core/di/di-container";
import { LeaveChatRoomUseCase } from "../domain/chat-room/use-case/LeaveChatRoomUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const leaveUserChatRoom = plainToInstance(
      LeaveChatRoomDTO,
      JSON.parse(event.body)
    );

    const isValidBody = await isValidSchema(leaveUserChatRoom);

    if (typeof isValidBody === "boolean") {
      const { chatroom_id, user_id } = JSON.parse(
        event.body
      ) as LeaveChatRoomDTO;

      await DIcontainer.resolve(LeaveChatRoomUseCase).execute({
        chatroom_id: chatroom_id,
        user_id: user_id,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Leave successfully" }),
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
