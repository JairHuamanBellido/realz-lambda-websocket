import "reflect-metadata";
import { APIGatewayEvent } from "aws-lambda";
import { DIcontainer } from "../core/di/di-container";
import { DeleteGuestUserUseCase } from "../domain/user/use-case/DeleteGuestUserUseCase";

export const handler = async (event: APIGatewayEvent) => {
  if (event.requestContext) {
    try {
      const connectionId = event.requestContext.connectionId ?? "";

      await DIcontainer.resolve(DeleteGuestUserUseCase).execute(connectionId);

      return {
        statusCode: 200,
        body: "Disconnected",
      };
    } catch (error) {

      console.error(error);
      return {
        statusCode: 500,
        body: error
      }
    }
  }
};
