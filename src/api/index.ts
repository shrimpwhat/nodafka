import {
  APIVersion,
  DescribeTopicPartitions,
} from "./implementations/index.js";

const API: Record<number, (body: Buffer) => Buffer<ArrayBuffer>> = {
  18: APIVersion,
  75: DescribeTopicPartitions,
};

export default API;
