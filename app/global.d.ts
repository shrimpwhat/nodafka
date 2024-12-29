interface MessageHeader {
  requestApiKey: number;
  requestApiVersion: number;
  correlationId: number;
}

interface MessgaeBody extends Uint8Array {}

interface Message {
  messageSize: number;
  header: MessageHeader;
  body: MessgaeBody;
}
