import { type RequestMessage } from "../protocol/types.js";
import { APIVersion } from "./implementations/index.js";

const API: Record<number, (req: RequestMessage) => Buffer<ArrayBuffer>> = {
  18: APIVersion,
};

export default API;
