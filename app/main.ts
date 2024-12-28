import net from "node:net";

const server = net.createServer((connection) => {
  // Handle request message
  connection.on("data", (req) => {
    // get int32 with offset 8 bytes
    const correlation_id = req.buffer.slice(8, 13);

    // response message
    const buffer = Buffer.alloc(8);

    buffer.writeInt32BE(0, 0); // message_size
    buffer.fill(Buffer.from(correlation_id), 4);

    connection.write(buffer);
  });
});

server.listen(9092, "127.0.0.1");
