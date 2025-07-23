import type { ReadBuffer } from "../protocol/types.js";

export function readCursor(_: Buffer, offset: number): ReadBuffer<null> {
  return { value: null, nextOffset: offset + 1 };
}

export function writeCursor() {
  return Buffer.from([0xff]);
}
