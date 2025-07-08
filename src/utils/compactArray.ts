import { readVarInt, writeVarInt } from "./varInt.js";

export function readCompactArray(
  buffer: Buffer,
  offset: number,
  fn: (currentOffset: number) => number
): number {
  const { value: length, nextOffset } = readVarInt(buffer, offset);
  let currentOffset = nextOffset;

  for (let i = 0; i < length - 1; ++i) {
    currentOffset = fn(currentOffset);
  }

  return currentOffset;
}

export function writeCompactArray(array: Buffer[]) {
  const length = writeVarInt(array.length + 1);

  return Buffer.concat([length, ...array]);
}
