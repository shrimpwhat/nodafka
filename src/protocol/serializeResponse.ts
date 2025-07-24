import type { ResponseMessage } from "./types.js";

export function serializeResponse({ header, body }: ResponseMessage) {
  const responseBuffer = Buffer.concat([header, body]);

  const messageSizeBuffer = Buffer.alloc(4);
  messageSizeBuffer.writeInt32BE(responseBuffer.length);

  const buffer = Buffer.concat([messageSizeBuffer, responseBuffer]);

  return buffer;
}
