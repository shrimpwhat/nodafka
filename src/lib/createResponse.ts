import type { RequestMessage, ResponseMessage } from "@types";
import API from "./api";
import SUPPORTED_VERSIONS from "./methods/versions";

export default function createResponse(
  request: RequestMessage
): ResponseMessage {
  const header = { correlationId: request.header.correlationId };

  let body: Buffer;

  const apiKey = request.header.requestApiKey,
    apiVersion = request.header.requestApiVersion;
  const { min, max } = SUPPORTED_VERSIONS[apiKey];

  if (!(apiKey in SUPPORTED_VERSIONS)) {
    body = Buffer.alloc(2);
    body.writeInt16BE(42); // INVALID_REQUEST
  } else if (apiVersion < min || apiVersion > max) {
    body = Buffer.alloc(2);
    body.writeInt16BE(35); // UNSUPPORTED_VERSION
  } else {
    body = API[apiKey](request);
  }

  return {
    header,
    body,
  };
}
