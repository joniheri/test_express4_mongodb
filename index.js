const express = require('express');
const app = express();
const port = 3001;
require('dotenv').config();

app.use(express.json());

// CORS
const cors = require('cors');
const whitelist = ['http://localhost:5173', 'http://example2.com'];
const corsOptions = {
  origin: function (origin, cb) {
    if (whitelist.indexOf(origin) !== -1) {
      cb(null, true);
    } else {
      cb(new Error('Not allowed by CORS'));
    }
  },
};
// app.use(cors(corsOptions));
app.use(cors());

// Connection DB
const { ConnectDBLocal, ConnectDBOnline } = require('./config/db');
ConnectDBLocal();

// Import router
const routerV1 = require('./src/routes/RouterV1');
app.use('/api', routerV1);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
