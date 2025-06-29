import { parseBody } from "./parseBody.js";

export function DescribeTopicPartitions(body: Buffer) {
  const parsedBody = parseBody(body);

  return Buffer.alloc(0);
}
