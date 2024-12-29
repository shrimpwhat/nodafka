import type { ResponseBody, ResponseHeader, ResponseMessage } from "../types";

function parseHeader(header: ResponseHeader) {
  const buffer = Buffer.alloc(4);
  buffer.writeInt32BE(header.correlationId);
  return buffer;
}

function parseBody(body: ResponseBody) {
  const errorCode = Buffer.alloc(2);
  errorCode.writeInt16BE(body.errorCode);
  return errorCode;
}

export default function parseResponse(response: ResponseMessage) {
  const messageSizeBuffer = Buffer.alloc(4);
  messageSizeBuffer.writeInt32BE(response.messageSize);

  const buffer = Buffer.concat([
    messageSizeBuffer,
    parseHeader(response.header),
    parseBody(response.body),
  ]);

  return buffer;
}
