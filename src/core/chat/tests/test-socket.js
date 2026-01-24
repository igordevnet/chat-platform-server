const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("✅ connected:", socket.id);

  const payload = {
    chatId: "chat-1",
    content: "Hello from test socket 👋",
  };

  console.log("📤 emitting newMessage:", payload);
  socket.emit("newMessage", payload);
});

socket.on('disconnect', () => {
  console.log('❌ disconnected');
});
