const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.json());

app.listen(process.env.APP_PORT);

require('./src/routes/index')(app)
