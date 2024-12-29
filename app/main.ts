import net from "node:net";
import getRequestMsg from "./lib/getRequestMsg";
import createResponseMsg from "./lib/createResponseMsg";

const server = net.createServer((connection) => {
  // Handle client message
  connection.on("data", (req) => {
    const msg = getRequestMsg(req.buffer);

    connection.write(createResponseMsg(msg));
  });
});

server.listen(9092, "127.0.0.1");
