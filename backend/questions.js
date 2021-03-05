require('dotenv').config();

const WebSocket = require('ws');
const uuid = require('uuid');
const { DynamoDBClient, ScanCommand, QueryCommand, PutItemCommand, UpdateItemCommand, GetItemCommand } = require('@aws-sdk/client-dynamodb');
const client = new DynamoDBClient({ region: 'us-east-2' });

const wss = new WebSocket.Server({ port: 3002 });

const parseQuestion = (question) => ({
    questionId: question.questionId.S,
    userId: question.userId.S,
    question: question.question.S,
    likes: question.likes ? question.likes.SS : [],
    isAnon: question.isAnon.BOOL
});

const send = (webSocket, type, data) => webSocket.send(
    JSON.stringify({
        type,
        payload: data
    })
);

const broadcast = (type, data) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            send(client, type, data);
        }
    });
};

const handleError = (err, webSocket) => {
    console.log(err);
    send(webSocket, 'error', err);
};

const getQuestion = async (questionId) => {
    const params = {
        TableName: 'questions',
        Key: { 'questionId': { 'S': questionId } }
    }
    const result = await client.send(new GetItemCommand(params));

    return parseQuestion(result.Item);
}

wss.on('connection', async webSocket => {
    webSocket.on('message', async rawMessage => {
        // {type: '...', payload: {...}}
        const message = JSON.parse(rawMessage);
        console.log('receive message', message);

        if (message.type === 'addQuestion') {
            const question = message.payload;

            const newQuestion = {
                questionId: { S: uuid.v1() },
                userId: { S: question.userId },
                question: { S: question.question },
                likes: { SS: [question.userId] },
                isAnon: { BOOL: question.isAnon }
            };

            try {
                await client.send(new PutItemCommand({
                    TableName: 'questions',
                    Item: newQuestion
                }));

                broadcast(
                    'addQuestion',
                    parseQuestion(newQuestion)
                );

            } catch (e) {
                handleError(e, webSocket);
            }
        } else if (message.type === 'addVote') {
            const {
                userId,
                questionId
            } = message.payload;
            try {
                await client.send(new UpdateItemCommand({
                    TableName: 'questions',
                    Key: { 'questionId': { 'S': questionId } },
                    UpdateExpression: 'ADD likes :user_id',
                    ExpressionAttributeValues: { ':user_id': { 'SS': [userId] } }
                }));
                broadcast( 'addQuestion', await getQuestion(questionId))
            } catch (e) {
                handleError(e, webSocket);
            }
        } else if (message.type === 'removeVote') {
            const {
                userId,
                questionId
            } = message.payload;
            try {
                await client.send(new UpdateItemCommand({
                    TableName: 'questions',
                    Key: { 'questionId': { 'S': questionId } },
                    UpdateExpression: 'DELETE likes :user_id',
                    ExpressionAttributeValues: { ':user_id': { 'SS': [userId] } }
                }));
                broadcast('addQuestion', await getQuestion(questionId))
            } catch (e) {
                handleError(e, webSocket);
            }
        }
    });

    try {
        const questions = await client.send(new ScanCommand({
            TableName: 'questions'
        }));
        const response = questions.Items.map(parseQuestion);
        send(webSocket, 'questions', response);
    } catch (e) {
        handleError(e, webSocket);
    }
});
