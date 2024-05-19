const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config();

// Connection DB

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
