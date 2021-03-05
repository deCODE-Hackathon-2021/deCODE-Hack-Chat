const uuid = require('uuid');
const { DynamoDBClient, ScanCommand, QueryCommand, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const twilio = require('twilio');
const client = new DynamoDBClient({ region: 'us-east-2' });


const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.getChatToken = async (req, res) => {
    const {
        identity,
        name,
        picture
    } = req.body;

    try {
        const user = twilioClient.chat.services(process.env.TWILIO_CHAT_SERVICE_SID).users.get(identity);
        await user.update({
            attributes: JSON.stringify({ name, picture })
        })
    } catch(e) {
        await twilioClient.chat.services(process.env.TWILIO_CHAT_SERVICE_SID).users.create({
            identity,
            friendlyName: name,
            attributes: {
                name,
                picture
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

    token.addGrant(chatGrant);
    token.identity = identity;

    res.json({ token: token.toJwt() });
};
