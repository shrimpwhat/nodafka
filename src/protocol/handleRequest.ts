import type {
  RequestHeader,
  RequestMessage,
  ResponseMessage,
} from "./types.js";
import API from "../api/index.js";
import { SUPPORTED_VERSIONS } from "../api/versions.js";
import { responseHeaderV0 } from "./header.js";
import { ERROR_CODE } from "./errorCode.js";

export function handleRequest(request: RequestMessage) {
  const { requestApiKey, requestApiVersion } = request.header;
  const supportedAPIVersion = SUPPORTED_VERSIONS[requestApiKey];

  if (!supportedAPIVersion) {
    return getErrorResponse(ERROR_CODE.INVALID_REQUEST, request.header);
  }

  if (
    requestApiVersion < supportedAPIVersion.min ||
    requestApiVersion > supportedAPIVersion.max
  ) {
    return getErrorResponse(ERROR_CODE.UNSUPPORTED_VERSION, request.header);
  }

  const response = callAPI(requestApiKey, request);

  return response;
}

function callAPI(key: number, request: RequestMessage): ResponseMessage {
  const result = API[key]?.(request);
  if (!result) {
    return getErrorResponse(ERROR_CODE.UNKNOWN_SERVER_ERROR, request.header);
  }

  return result;
}

function getErrorResponse(
  error: number,
  requestHeader: RequestHeader
): ResponseMessage {
  const errorHeader = responseHeaderV0(requestHeader);

  let errorBody = Buffer.alloc(2);
  errorBody.writeInt16BE(error);

  return { header: errorHeader, body: errorBody };
}
