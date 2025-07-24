import { parseRequestHeaderV2 } from "./header.js";
import type { RequestMessage } from "./types.js";

export function parseRequest(msg: ArrayBufferLike): RequestMessage {
  const buffer = Buffer.from(msg);
  const MESSAGE_SIZE_LENGTH = 4;

  const messageSize = buffer.readInt32BE();

  const { header, bodyOffeset } = parseRequestHeaderV2(
    buffer.subarray(MESSAGE_SIZE_LENGTH)
  );

  const body = buffer.subarray(MESSAGE_SIZE_LENGTH + bodyOffeset);

  return { messageSize, header, body };
}
