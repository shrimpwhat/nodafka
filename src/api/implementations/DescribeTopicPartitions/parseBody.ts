import {
  readTagBuffer,
  readCompactString,
  readCompactArray,
  readCursor,
} from "../../../utils/index.js";

export function parseBody(body: Buffer) {
  const topics: string[] = [];

  const partitionLimitOffset = readCompactArray(body, 0, (offset) => {
    const topic = readCompactString(body, offset);
    if (topic.value) {
      topics.push(topic.value);
    }

    const tagBuffer = readTagBuffer(body, topic.nextOffset);
    return tagBuffer.nextOffset;
  });

  const partitionLimit = body.readInt32BE(partitionLimitOffset);
  const cursor = readCursor(body, partitionLimitOffset + 4);
  // also TAG_BUFFER

  return {
    topics,
    partitionLimit,
    cursor: cursor.value,
  };
}
