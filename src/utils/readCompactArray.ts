import { readVarInt } from "./varInt.js";

export function readCompactArray(
  buffer: Buffer,
  offset: number,
  fn: (currentOffset: number) => number
): number {
  const { value: length, nextOffset } = readVarInt(buffer, offset);
  let currentOffset = nextOffset;

  for (let i = 0; i < length; ++i) {
    currentOffset = fn(currentOffset);
  }

  return currentOffset;
}
