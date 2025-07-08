import { writeCompactArray } from "../../../utils/index.js";
import { parseBody } from "./parseBody.js";

export function DescribeTopicPartitions(body: Buffer) {
  const parsedBody = parseBody(body);

  const response: Buffer[] = [];

  for (const topic of parsedBody.topics) {
    const errorCode = Buffer.from([0, 3]); // UNKNOWN_TOPIC_OR_PARTITION
    const topicName = Buffer.from(topic);
    const topicId = Buffer.alloc(16);
    const partitions = writeCompactArray([]);

    response.push(Buffer.concat([errorCode, topicName, topicId, partitions]));
  }

  console.log(response);
  return response;
}
