export function readVarInt(
  buffer: Buffer,
  offset: number
): { value: number; nextOffset: number } {
  let result = 0;
  let shift = 0;
  let currentOffset = offset;
  let more = true;
  let i = 0;

  while (more) {
    const byte = buffer.readUInt8(currentOffset++);
    more = (byte & 0x80) !== 0;
    const value = byte & 0x7f;
    result |= value << shift;
    shift += 7;
    i++;
  }

  return { value: result, nextOffset: currentOffset };
}

export function writeVarInt(value: number): Buffer {
  const bytes: number[] = [];
  let current = value;

  while (current >= 0x80) {
    bytes.push((current & 0x7f) | 0x80);
    current >>= 7;
  }

  bytes.push(current & 0x7f);

  return Buffer.from(bytes);
}
