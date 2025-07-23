import type { ReadBuffer } from "../protocol/types.js";
import { readVarInt, writeVarInt } from "./varInt.js";

export function readCompactString(
  buffer: Buffer,
  offset: number
): ReadBuffer<string | null> {
  const length = readVarInt(buffer, offset);
  const start = length.nextOffset;

  if (length.value === 0) {
    return { value: null, nextOffset: start };
  }

  const end = start + length.value - 1;
  const string = buffer.subarray(start, end).toString();
  return { value: string, nextOffset: end };
}

export function writeCompactString(str: string): Buffer {
  const stringBuffer = Buffer.from(str);
  const length = writeVarInt(stringBuffer.length + 1);

  return Buffer.concat([length, stringBuffer]);
}
