const mongoose = require('mongoose');

const ConnectDBLocal = async () => {
  try {
    const conn = await mongoose.connect(process.env.ConnectDBLocal);
    console.log(`Connect to Database Success: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

const ConnectDBOnline = async () => {
  try {
    const conn = await mongoose.connect(process.env.ConnectDBLocal);
    console.log(`Connect to Database Success: ${conn.connection.host}`);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { ConnectDBLocal, ConnectDBOnline };
