const uuid = require('uuid');
const { DynamoDBClient, ScanCommand, QueryCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({ region: 'us-east-2' });

exports.getMessages = async (req, res) => {
    const results = await client.send(new ScanCommand({
        TableName: 'Messages',
    }));

    res.status(200).json(results.Items.map(message => ({
        MessageContent: message.MessageContent.S,
        MessageTimestamp: message.MessageTimestamp.N,
        MessageId: message.MessageId.S
    })));
};

exports.addMessage = async (req, res) => {
    const {
        message
    } = req.body;

    if(typeof message === 'string' && message.trim().length > 0) {
        const newMessage = {
            MessageContent: { S: message.trim() },
            MessageId: { S: uuid.v1() },
            MessageTimestamp: { N: `${(new Date()).getTime()}` }
        };

        await client.send(new PutItemCommand({
            TableName: 'Messages',
            Item: newMessage
        }))

        await exports.getMessages(req, res);
    } else {
        res.status(400).json({
            error: 'Invalid message'
        })
    }
}

