function parseHeader(buffer: Buffer): MessageHeader {
  const requestApiKey = buffer.readInt16BE();
  const requestApiVersion = buffer.readInt16BE(4);
  const correlationId = buffer.readInt32BE(4);

  return {
    requestApiKey,
    requestApiVersion,
    correlationId,
  };
}

export default function getRequestMsg(msg: ArrayBufferLike): Message {
  const buffer = Buffer.from(msg);

  const messageSize = buffer.readInt32BE();

  const header = parseHeader(buffer.subarray(4));

  const body = new Uint8Array([]);

  return { messageSize, header, body };
}
