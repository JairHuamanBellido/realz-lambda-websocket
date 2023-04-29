import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { plainToInstance } from "class-transformer";
import { CreateMessageDTO } from "../application/dto/CreateMessageDTO";
import isValidSchema from "../application/validator/SchemaValidator";
import { DIcontainer } from "../core/di/di-container";
import { SendMessageUseCase } from "../domain/message/use-case/SendMessageUseCase";

export const handler = async (event: APIGatewayEvent) => {
  try {
    const payload = JSON.parse(event.body) as CreateMessageDTO;
    const message = plainToInstance(CreateMessageDTO, payload);

    const isValidBody = await isValidSchema(message);
    if (typeof isValidBody === "boolean") {
      const { chatroom_id, sender_id, text } = payload;

      await DIcontainer.resolve(SendMessageUseCase).execute({
        chatroom_id,
        sender_id,
        text,
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Message sent successfully" }),
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
