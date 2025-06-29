import type { RequestMessage } from "../../protocol/types.js";
import { SUPPORTED_VERSIONS } from "../versions.js";
import { TAG_BUFFER } from "../../constants.js";

const apiKeys = Object.entries(SUPPORTED_VERSIONS).map(([k, v]) => {
  const key = Buffer.alloc(2);
  key.writeInt16BE(Number(k));

  const min = Buffer.alloc(2);
  min.writeInt16BE(v.min);
  const max = Buffer.alloc(2);
  max.writeInt16BE(v.max);

  return Buffer.concat([key, min, max, TAG_BUFFER]);
});

export function APIVersion() {
  const errorCodeBuffer = Buffer.alloc(2);

  const keysCount = Buffer.alloc(1);
  keysCount.writeInt8(apiKeys.length + 1);

  const apiKeysBuffer = Buffer.concat([keysCount, ...apiKeys]);

  const throttleBuffer = Buffer.alloc(4);

  return Buffer.concat([
    errorCodeBuffer,
    apiKeysBuffer,
    throttleBuffer,
    TAG_BUFFER,
  ]);
}
