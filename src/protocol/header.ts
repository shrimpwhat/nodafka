import { EMPTY_TAG_BUFFER } from "../constants.js";
import { readNullableString, readTagBuffer } from "../utils/index.js";
import type { RequestHeader } from "./types.js";

export function parseRequestHeaderV2(header: Buffer): {
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

export function responseHeaderV0(header: RequestHeader) {
  const buffer = Buffer.alloc(4);
  buffer.writeInt32BE(header.correlationId);
  return buffer;
}

export function responseHeaderV1(header: RequestHeader) {
  return Buffer.concat([responseHeaderV0(header), EMPTY_TAG_BUFFER]);
}
