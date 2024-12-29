interface MessageHeader {
  correlation_id: number;
}

interface MessgaeBody extends Uint8Array {}

interface Message {
  messageSize: number;
  header: MessageHeader;
  body: MessgaeBody;
}
