import net from "node:net";

const server = net.createServer((connection) => {
  connection.on("data", (req) => {
    const buffer = Buffer.alloc(8);
    buffer.writeInt32BE(0, 0);
    buffer.writeInt32BE(7, 4);

    connection.write(buffer);
  });
});

server.listen(9092, "127.0.0.1");
