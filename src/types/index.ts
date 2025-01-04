export interface RequestHeader {
  requestApiKey: number;
  requestApiVersion: number;
  correlationId: number;
}

export interface ResponseHeader {
  correlationId: number;
}

export interface RequestMessage {
  messageSize: number;
  header: RequestHeader;
  body: Buffer;
}

export interface ResponseMessage {
  header: ResponseHeader;
  body: Buffer;
}
