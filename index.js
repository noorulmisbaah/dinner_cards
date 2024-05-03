const express = require('express');
const { fetchInformation } = require('./modules/fetching');
const { submitInformation } = require('./modules/submissions');
const app = express();

app.use(express.urlencoded({ static: true }));
app.use(express.json());
app.use(express.static('rsc'));
app.set('view engine', 'ejs');
app.listen(8000);

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './rsc' });
});

app.post('/submit_information', (req, res) => submitInformation(req, res));
app.post('/fetch_information', (req, res) => fetchInformation(req, res));