const uuid = require('uuid');
const { DynamoDBClient, ScanCommand, QueryCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const twilio = require('twilio');
const client = new DynamoDBClient({ region: 'us-east-2' });


const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.getChatToken = async (req, res) => {
    const {
        identity,
        name
    } = req.body;

    try {
        await twilioClient.chat.services(process.env.TWILIO_CHAT_SERVICE_SID).users.get(identity).fetch();
    } catch(e) {
        await twilioClient.chat.services(process.env.TWILIO_CHAT_SERVICE_SID).users.create({
            identity,
            friendlyName: name,
            attributes: {
                name
            }
        })
    }

    const chatGrant = new twilio.jwt.AccessToken.ChatGrant({
        serviceSid: process.env.TWILIO_CHAT_SERVICE_SID
    });

    const token = new twilio.jwt.AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    console.log(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET
    );

    token.addGrant(chatGrant);
    token.identity = identity;

    res.json({ token: token.toJwt() });
};

exports.getMessages = async (req, res) => {
    const results = await client.send(new ScanCommand({
        TableName: 'Messages'
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

    if (typeof message === 'string' && message.trim().length > 0) {
        const newMessage = {
            MessageContent: { S: message.trim() },
            MessageId: { S: uuid.v1() },
            MessageTimestamp: { N: `${(new Date()).getTime()}` }
        };

        await client.send(new PutItemCommand({
            TableName: 'Messages',
            Item: newMessage
        }));

        await exports.getMessages(req, res);
    } else {
        res.status(400).json({
            error: 'Invalid message'
        });
    }
};

