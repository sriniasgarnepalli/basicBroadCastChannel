import net from "net";
import readline from "readline";

const interface1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new net.Socket();
let waitingForResponse = false;

client.connect(3000, "127.0.0.1", () => {
  console.log("Connected to server");

  promptUser();
});

function promptUser() {
  interface1.setPrompt("Type a message: ");
  interface1.prompt();
}

interface1.on("line", (line) => {
  const trimmedLine = line.trim();
  if (!waitingForResponse) {
    if (trimmedLine) {
      if (
        trimmedLine.toLowerCase() === "exit" ||
        trimmedLine.toLowerCase() === "quit"
      ) {
        console.log("Ending chat...");
        client.end(); // Close the connection
        interface1.close(); // Close the readline interface
        return;
      }
      client.write(trimmedLine); // Send the input to the server
      waitingForResponse = true; // Set flag to true to indicate we're waiting for a response
    } else {
      console.log("Please type a message before pressing Enter.");
    }
  }
  console.log("Waiting for server response. Please wait");
});

client.on("data", (data) => {
  console.log("\nServer says: " + data.toString().trim());
  waitingForResponse = false;
  promptUser();
});

client.on("close", () => {
  console.log("Connection closed");
  interface1.close();
});
