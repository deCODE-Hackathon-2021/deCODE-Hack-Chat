const WebSocket = require('ws')
const { DynamoDBClient, ScanCommand, QueryCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient({ region: 'us-east-2' });

const wss = new WebSocket.Server({ port: 3002 })

const questions = [
  {
    questionId: "someRandomId",
    userId: "somemid", 
    question: "some message",
    likes: ["a-user", "another-user"],
    isAnon: false
  }
]

const handleConnect = (items, webSocket) => { 
  const response = items.map((item) => {
    return {
      questionId: item.questionId.S,
      userId: item.userId.S,
      question: item.question.S,
      likes: item.likes.SS,
      isAnon: item.isAnon.BOOL
    }
  })
  webSocket.send(JSON.stringify(response))
}

const handleError = (err, webSocket) => { 
  console.log(err)
  webSocket.send("Couldn't put item in dynamodb")
}

wss.on('connection', webSocket => {
  webSocket.on('message', question => {
    
    // console.log(process.env)
    // console.log(results.log)
    try { 
      const questionItem = JSON.parse(question)
      const results = client.send(new PutItemCommand({
        TableName: 'questions',
        Item: {
          questionId: {S: questionItem.questionId},
          userId: {S: questionItem.userId},
          question: {S: questionItem.question},
          likes: {SS: questionItem.likes},
          isAnon: {BOOL: questionItem.isAnon}
        }
      })).then(
        () => broadcast(questionItem), 
        (err) => handleError(err, webSocket)
      )
      .catch(
        (err) => console.log(err)
      )
      
    } catch(e) { 
      console.log(e)
      webSocket.send("JSON parse error")
    }
  });
  const res = client.send(new ScanCommand({
    TableName: 'questions'
  }))
  .then(
    (res) => handleConnect(res.Items, webSocket),
    (err) => console.log(err)
  )
  .catch(
    (err) => console.log(err)
  )
});

function broadcast(data) {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
}

