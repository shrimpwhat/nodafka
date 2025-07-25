import { SUPPORTED_VERSIONS } from "../../versions.js";
import { EMPTY_TAG_BUFFER } from "../../../constants.js";
import type { RequestMessage } from "../../../protocol/types.js";
import { responseHeaderV0 } from "../../../protocol/header.js";

const apiKeys = Object.entries(SUPPORTED_VERSIONS).map(([k, v]) => {
  const key = Buffer.alloc(2);
  key.writeInt16BE(Number(k));

  const min = Buffer.alloc(2);
  min.writeInt16BE(v.min);
  const max = Buffer.alloc(2);
  max.writeInt16BE(v.max);

  return Buffer.concat([key, min, max, EMPTY_TAG_BUFFER]);
});

export function APIVersion(request: RequestMessage) {
  const errorCodeBuffer = Buffer.alloc(2);

  const keysCount = Buffer.alloc(1);
  keysCount.writeInt8(apiKeys.length + 1);

  const apiKeysBuffer = Buffer.concat([keysCount, ...apiKeys]);

  const throttleBuffer = Buffer.alloc(4);

  const body = Buffer.concat([
    errorCodeBuffer,
    apiKeysBuffer,
    throttleBuffer,
    EMPTY_TAG_BUFFER,
  ]);

  return {
    header: responseHeaderV0(request.header),
    body,
  };
}
