import { RequestMessage } from "@types";
import SUPPORTED_VERSIONS from "../versions";

const apiKeys = Object.entries(SUPPORTED_VERSIONS).map(([k, v]) => {
  const key = Buffer.alloc(2);
  key.writeInt16BE(Number(k));

  const min = Buffer.alloc(2);
  min.writeInt16BE(v.min);
  const max = Buffer.alloc(2);
  max.writeInt16BE(v.max);

  return Buffer.concat([key, min, max]);
});

const NULL_TAG = Buffer.from([0, 0]);

export default function handler(req: RequestMessage) {
  const errorCodeBuffer = Buffer.alloc(2);
  errorCodeBuffer.writeInt16BE(0);

  const keysCount = Buffer.alloc(1);
  keysCount.writeInt8(apiKeys.length);

  const apiKeysBuffer = Buffer.concat([keysCount, ...apiKeys, NULL_TAG]);

  const throttleBuffer = Buffer.alloc(4);
  throttleBuffer.writeInt32BE(0);

  return Buffer.concat([
    errorCodeBuffer,
    apiKeysBuffer,
    throttleBuffer,
    NULL_TAG,
  ]);
}
