export enum MessageType {
  REQUEST,
  RESPONSE,
}

export interface RequestHeader {
  requestApiKey: number;
  requestApiVersion: number;
  correlationId: number;
}

export interface ResponseHeader {
  correlationId: number;
}

export interface RequestBody extends Buffer {}

export interface ResponseBody {
  errorCode: number;
}

interface Message<T extends MessageType> {
  messageSize: number;
  header: T extends MessageType.REQUEST ? RequestHeader : ResponseHeader;
  body: T extends MessageType.REQUEST ? RequestBody : ResponseBody;
}

export interface RequestMessage extends Message<MessageType.REQUEST> {}

export interface ResponseMessage extends Message<MessageType.RESPONSE> {}
