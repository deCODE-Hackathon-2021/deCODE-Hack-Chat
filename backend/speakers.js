const io = require('socket.io')(3003, {
  cors: {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"]
  }
});

const activeSpeakers = new Set();
const activeUsers = new Set();


io.on('connection', (socket) => {
  socket.emit('listSpeakers', Array.from(activeSpeakers));
  socket.on("addSpeaker", (data) => {
    console.log(data);
    console.log("Received add speaker from: " + socket.id)
    activeSpeakers.add(data);
    console.log(activeSpeakers.values());
    socket.emit('listSpeakers', Array.from(activeSpeakers));
    socket.broadcast.emit('listSpeakers', Array.from(activeSpeakers));
    console.log(activeSpeakers);
  });
  socket.on("removeSpeaker", (data) => {
    console.log(data);
    console.log("Received remove speaker from: " + socket.id)
    activeSpeakers.delete(data);
    socket.emit('listSpeakers', Array.from(activeSpeakers));
    socket.broadcast.emit('listSpeakers', Array.from(activeSpeakers));
    console.log(activeSpeakers);
  });
  socket.on('disconnect', () => {
    socket.emit('listSpeakers', Array.from(activeSpeakers));
    socket.broadcast.emit('listSpeakers', Array.from(activeSpeakers));
  })
});

