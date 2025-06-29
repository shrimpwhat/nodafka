import type { ReadBuffer } from "../protocol/types.js";

export function readCursor(buffer: Buffer, offset: number): ReadBuffer<null> {
  return { value: null, nextOffset: offset + 1 };
}
