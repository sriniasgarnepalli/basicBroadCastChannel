import net from "net";

const server = net.createServer((socket) => {
  console.log("Client connected");

  socket.on("data", (data) => {
    console.log("Received: " + data.toString().trim());
    socket.write("Server received: " + data);
  });

  socket.on("end", () => {
    console.log("Client disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
