export default function getRequestMsg(msg: ArrayBufferLike): Message {
  const buffer = Buffer.from(msg);

  const messageSize = buffer.readInt32BE();

  const headerBuffer = Buffer.from(buffer.subarray(4));
  const correlation_id = headerBuffer.readInt32BE(4);

  const header = { correlation_id };

  const body = new Uint8Array([]);

  return { messageSize, header, body };
}
