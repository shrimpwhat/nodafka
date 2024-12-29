import net from "node:net";
import parseRequest from "./lib/parseRequest";
import parseResponse from "./lib/parseResponse";
import createResponse from "./lib/createResponse";

const server = net.createServer((connection) => {
  // Handle client message
  connection.on("data", (data) => {
    const request = parseRequest(data.buffer);
    const response = createResponse(request);
    connection.write(parseResponse(response));
  });
});

server.listen(9092, "127.0.0.1");
