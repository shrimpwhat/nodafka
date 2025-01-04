import { RequestMessage } from "@types";
import ApiVersions from "./methods/ApiVersions";

const api: Record<number, (req: RequestMessage) => Buffer> = {
  18: ApiVersions,
};

export default api;
