import { type RequestMessage } from "../protocol/types.js";
import {
  APIVersion,
  DescribeTopicPartitions,
} from "./implementations/index.js";

const API: Record<number, (req: RequestMessage) => Buffer<ArrayBuffer>> = {
  18: APIVersion,
  75: DescribeTopicPartitions,
};

export default API;
