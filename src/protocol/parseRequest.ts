import type { RequestHeader, RequestMessage } from "./types.js";

function parseHeader(buffer: Buffer): RequestHeader {
  const requestApiKey = buffer.readInt16BE();
  const requestApiVersion = buffer.readInt16BE(2);
  const correlationId = buffer.readInt32BE(4);

  return {
    requestApiKey,
    requestApiVersion,
    correlationId,
  };
}

export function parseRequest(msg: ArrayBufferLike): RequestMessage {
  const buffer = Buffer.from(msg);

  const messageSize = buffer.readInt32BE();

  const header = parseHeader(buffer.subarray(4));

  const body = Buffer.from([]);

  return { messageSize, header, body };
}
