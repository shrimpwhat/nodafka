import type { ResponseHeader, ResponseMessage } from "./types.js";

function serializeHeader(header: ResponseHeader) {
  const buffer = Buffer.alloc(4);
  buffer.writeInt32BE(header.correlationId);
  return buffer;
}

export function serializeResponse(response: ResponseMessage) {
  const headerBuffer = serializeHeader(response.header);

  const responseBuffer = Buffer.concat([headerBuffer, response.body]);

  const messageSizeBuffer = Buffer.alloc(4);
  messageSizeBuffer.writeInt32BE(responseBuffer.length);

  const buffer = Buffer.concat([messageSizeBuffer, responseBuffer]);

  return buffer;
}
