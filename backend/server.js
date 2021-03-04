const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'build', 'index.html'));
});

const server = app.listen(process.env.PORT || 3001, () => {
    console.log('Listening...');
});
