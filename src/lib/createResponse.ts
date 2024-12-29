import type { RequestMessage, ResponseBody, ResponseMessage } from "../types";

export default function createResponse(
  request: RequestMessage
): ResponseMessage {
  const header = { correlationId: request.header.correlationId };

  const body = { errorCode: 0 };
  if (request.header.requestApiVersion !== 4) {
    body.errorCode = 35; // UNSUPPORTED_VERSION
  }

  return {
    messageSize: 0,
    header,
    body,
  };
}
