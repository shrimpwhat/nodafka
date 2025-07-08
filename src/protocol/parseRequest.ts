import { readTagBuffer, readNullableString } from "../utils/index.js";
import type { RequestHeader, RequestMessage } from "./types.js";

function parseHeader(header: Buffer): {
  header: RequestHeader;
  bodyOffeset: number;
} {
  const requestApiKey = header.readInt16BE();
  const requestApiVersion = header.readInt16BE(2);
  const correlationId = header.readInt32BE(4);
  const clientId = readNullableString(header, 8);
  const tagBuffer = readTagBuffer(header, clientId.nextOffset);

  const parsedHeader: RequestHeader = {
    requestApiKey,
    requestApiVersion,
    correlationId,
  };

  return { header: parsedHeader, bodyOffeset: tagBuffer.nextOffset };
}

export function parseRequest(msg: ArrayBufferLike): RequestMessage {
  const buffer = Buffer.from(msg);
  const MESSAGE_SIZE_LENGTH = 4;

  const messageSize = buffer.readInt32BE();

  const { header, bodyOffeset } = parseHeader(
    buffer.subarray(MESSAGE_SIZE_LENGTH)
  );

  const body = buffer.subarray(MESSAGE_SIZE_LENGTH + bodyOffeset);

  return { messageSize, header, body };
}
