import { EMPTY_TAG_BUFFER } from "../../../constants.js";
import { responseHeaderV1 } from "../../../protocol/header.js";
import type { RequestMessage } from "../../../protocol/types.js";
import {
  writeCompactArray,
  writeCompactString,
  writeCursor,
} from "../../../utils/index.js";
import { parseBody } from "./parseBody.js";

export function DescribeTopicPartitions(request: RequestMessage) {
  const parsedBody = parseBody(request.body);

  const throttleTime = Buffer.alloc(4);

  const topics: Buffer[] = [];

  for (const topic of parsedBody.topics) {
    const errorCode = Buffer.from([0, 3]); // UNKNOWN_TOPIC_OR_PARTITION
    const topicName = writeCompactString(topic);
    const topicId = Buffer.alloc(16);
    const isInternal = Buffer.from([0]);
    const partitions = writeCompactArray([]);
    const operations = Buffer.alloc(4);

    topics.push(
      Buffer.concat([
        errorCode,
        topicName,
        topicId,
        isInternal,
        partitions,
        operations,
        EMPTY_TAG_BUFFER,
      ])
    );
  }

  const body = Buffer.concat([
    throttleTime,
    writeCompactArray(topics),
    writeCursor(),
    EMPTY_TAG_BUFFER,
  ]);

  return {
    header: responseHeaderV1(request.header),
    body,
  };
}
