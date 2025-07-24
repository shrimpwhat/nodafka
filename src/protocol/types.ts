export interface RequestHeader {
  requestApiKey: number;
  requestApiVersion: number;
  correlationId: number;
}

export interface RequestMessage {
  messageSize: number;
  header: RequestHeader;
  body: Buffer;
}

export interface ResponseMessage {
  header: Buffer;
  body: Buffer;
}

export interface ReadBuffer<T = Buffer> {
  value: T;
  nextOffset: number;
}
