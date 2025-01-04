import type { ResponseHeader, ResponseMessage } from "../types";

function parseHeader(header: ResponseHeader) {
  const buffer = Buffer.alloc(4);
  buffer.writeInt32BE(header.correlationId);
  return buffer;
}

export default function parseResponse(response: ResponseMessage) {
  const headerBuffer = parseHeader(response.header);

  const responseBuffer = Buffer.concat([headerBuffer, response.body]);

  const messageSizeBuffer = Buffer.alloc(4);
  messageSizeBuffer.writeInt32BE(responseBuffer.length);

  const buffer = Buffer.concat([messageSizeBuffer, responseBuffer]);

  return buffer;
}
