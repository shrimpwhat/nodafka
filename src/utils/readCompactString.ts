import type { ReadBuffer } from "../protocol/types.js";
import { readVarInt } from "./varInt.js";

export function readCompactString(
  buffer: Buffer,
  offset: number
): ReadBuffer<string | null> {
  const length = readVarInt(buffer, offset);
  const stringStart = offset + length.nextOffset;

  if (length.value === 0) {
    return { value: null, nextOffset: stringStart };
  }

  const end = stringStart + length.value;
  const string = buffer.subarray(stringStart, end).toString();
  return { value: string, nextOffset: end };
}
