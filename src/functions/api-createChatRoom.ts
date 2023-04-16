import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { CreateChatRoomDTO } from "../application/dto/CreateChatRoomDTO";
import isValidSchema from "../application/validator/SchemaValidator";
import { DIcontainer } from "../core/di/di-container";
import { CreateChatRoomUseCase } from "../domain/chat-room/use-case/CreateChatRoomUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const newChatRoom = plainToInstance(
      CreateChatRoomDTO,
      JSON.parse(event.body)
    );
    const isValidBody = await isValidSchema(newChatRoom);

    if (typeof isValidBody === "boolean") {
      const chatRoom = await DIcontainer.resolve(CreateChatRoomUseCase).execute(
        newChatRoom
      );
      return {
        statusCode: 201,
        body: JSON.stringify(chatRoom),
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
