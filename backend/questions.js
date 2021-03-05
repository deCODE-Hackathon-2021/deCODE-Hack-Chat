const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 3002 })

const questions = [
  {
    questionId: "someRandomId",
    userId: "somemid", 
    question: "some message",
    likes: ["a-user", "another-user"]
  }
]

wss.on('connection', webSocket => {
  webSocket.on('message', question => {
    try { 
      const questionItem = JSON.parse(message)
      questions.push(questionItem)
      broadcast(question);
    } catch(e) { 
      webSocket.send("JSON parse error")
    }
  });
  webSocket.send(JSON.stringify(questions))
});

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

