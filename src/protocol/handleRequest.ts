import type { RequestMessage, ResponseMessage } from "./types.js";
import API from "../api/index.js";
import { SUPPORTED_VERSIONS } from "../api/versions.js";

export function handleRequest(request: RequestMessage): ResponseMessage {
  const header = { correlationId: request.header.correlationId };

  let body = Buffer.alloc(2);

  const { requestApiKey, requestApiVersion } = request.header;
  const supportedAPIVersion = SUPPORTED_VERSIONS[requestApiKey];

  if (!supportedAPIVersion) {
    body.writeInt16BE(42); // INVALID_REQUEST
    return { header, body };
  }

  if (
    requestApiVersion < supportedAPIVersion.min ||
    requestApiVersion > supportedAPIVersion.max
  ) {
    body.writeInt16BE(35); // UNSUPPORTED_VERSION
  } else {
    body = callAPI(requestApiKey, request);
  }

  return {
    header,
    body,
  };
}

function callAPI(key: number, request: RequestMessage): Buffer<ArrayBuffer> {
  const result = API[key]?.(request);

  if (!result) {
    let error = Buffer.alloc(2);
    error.writeInt16BE(-1); // UNKNOWN_SERVER_ERROR
    return error;
  }

  return result;
}
