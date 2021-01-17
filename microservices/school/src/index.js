const bodyParser = require('body-parser');
const env = require('dotenv');
const cors = require('cors');
env.config();

const routes = require('./routes/index.route');

const express = require('express');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT_SCHOOL || 3000;

const BASE_URL = '/fullstack';

app.use(BASE_URL, routes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
