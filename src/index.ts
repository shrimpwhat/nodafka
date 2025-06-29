import net from "node:net";
import {
  parseRequest,
  handleRequest,
  serializeResponse,
} from "./protocol/index.js";

const server = net.createServer((connection) => {
  // Handle client message
  connection.on("data", (data) => {
    const request = parseRequest(data.buffer);

    const response = handleRequest(request);

    const serialized = serializeResponse(response);
    connection.write(serialized);
  });
});

server.listen(9092, "127.0.0.1");
