import { APIGatewayEvent } from "aws-lambda";

export const handler = async (event: APIGatewayEvent) => {
  if (event.requestContext) {
    try {
      const connectionId = event.requestContext.connectionId || "";

      console.log(connectionId);
      return { statusCode: "200" };
    } catch (e) {
      console.error(e);
    }
  }
};
