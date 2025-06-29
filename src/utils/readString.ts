import type { ReadBuffer } from "../protocol/types.js";

export function readString(buffer: Buffer, offset: number, lengthSize = 2) {
  const length = buffer.readIntBE(offset, lengthSize);
  const start = offset + lengthSize;
  const end = start + length + 1;
  const value = buffer.subarray(start, end).toString();

  return { value, nextOffset: end, length };
}

export function readNullableString(
  buffer: Buffer,
  offset: number,
  lengthSize = 2
) {
  const { value, length, nextOffset } = readString(buffer, offset, lengthSize);

  return {
    value: length === -1 ? null : value,
    nextOffset: nextOffset,
    length,
  };
}
