function createHeaderBuffer(header: MessageHeader) {
  const buffer = Buffer.alloc(4);
  buffer.writeInt32BE(header.correlation_id);
  return buffer;
}

export default function createResponseMsg({
  messageSize,
  header,
  body,
}: Message) {
  const messageSizeBuffer = Buffer.alloc(4);
  messageSizeBuffer.writeInt32BE(messageSize);

  const buffer = Buffer.concat([
    messageSizeBuffer,
    createHeaderBuffer(header),
    body,
  ]);
  return buffer;
}
