const express = require('express');
const app = express();
const connectdb = require('./connectdb');
const cors = require('cors');

app.use(cors());
connectdb();
app.use(express.json());
app.use('/todos', require('./routes'))

app.listen(3001, () => console.log("listening to 3001"));