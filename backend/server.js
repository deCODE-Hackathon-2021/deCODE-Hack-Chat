require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const chat = require('./chat');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

/**
 * Generate an Access Token for a chat application user - it generates a random
 * username for the client requesting a token, and takes a device ID as a query
 * parameter.
 */
app.get('/token', function(request, response) {
    const { identity } = request.query;

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created.
    const token = new AccessToken(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_API_KEY,
        process.env.TWILIO_API_SECRET,
        { ttl: MAX_ALLOWED_SESSION_DURATION }
    );

    // Assign the generated identity to the token.
    token.identity = identity;

    // Grant the access token Twilio Video capabilities.
    const grant = new VideoGrant();
    token.addGrant(grant);

    // Serialize the token to a JWT string.
    response.send(token.toJwt());
});

app.get('/messages', chat.getMessages)
app.post('/messages', chat.addMessage)

const server = app.listen(process.env.PORT || 3001, () => {
    console.log('Listening...');
});
