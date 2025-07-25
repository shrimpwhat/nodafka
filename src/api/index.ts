import type { RequestMessage, ResponseMessage } from "../protocol/types.js";
import {
  APIVersion,
  DescribeTopicPartitions,
} from "./implementations/index.js";

const API: Record<number, (request: RequestMessage) => ResponseMessage> = {
  18: APIVersion,
  75: DescribeTopicPartitions,
};

export default API;
