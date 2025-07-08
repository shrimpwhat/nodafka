import { readVarInt } from "./varInt.js";

export function readTagBuffer(buffer: Buffer, intialOffset: number) {
  let offset = intialOffset;
  const { value: numTaggedFields, nextOffset } = readVarInt(buffer, offset);
  // console.log({ intialOffset, numTaggedFields, nextOffset });
  offset = nextOffset;

  const taggedFields = new Map<number, Buffer>();
  for (let i = 0; i < numTaggedFields; i++) {
    const { value: tag, nextOffset: nextOffsetTag } = readVarInt(
      buffer,
      offset
    );
    offset = nextOffsetTag;

    const { value: length, nextOffset: nextOffsetLength } = readVarInt(
      buffer,
      offset
    );
    offset = nextOffsetLength;

    const value = buffer.subarray(offset, offset + length);
    offset += length;
    taggedFields.set(tag, value);
  }

  return { taggedFields, nextOffset: offset };
}
