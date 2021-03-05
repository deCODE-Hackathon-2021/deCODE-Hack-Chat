const io = require('socket.io')(3003, {
  cors: {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const activeSpeakers = new Set();
const activeUsers = new Set();


io.on('connection', (socket) => {
  activeSpeakers.push("this is user");
  console.log('a user connected');
  socket.on("addSpeaker", (data) => {
    activeUsers.add("Added a speaker");
    console.log(activeUsers);
  });
});

