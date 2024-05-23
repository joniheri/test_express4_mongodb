const bcrypt = require('bcrypt');
const { user: UserModel } = require('../models/UserModel');

const userSeed = async (_, res) => {
  try {
    const dataInput = {
      email: 'admin@email.com',
      username: 'admin',
      password: await bcrypt.hash('admin', 10),
      fullname: 'admin',
      level: 'administrator',
    };

    // Check email already exist
    const userByEmail = await UserModel.findOne({ email: dataInput.email });
    if (userByEmail) {
      console.log({
        status: 'fail',
        message: `User with email:${dataInput.email} already exist`,
      });
      res.status(400).send({
        status: 'fail',
        message: `User with email:${dataInput.email} already exist`,
      });
      return;
    }

    // Check username already exist
    const userByUsername = await UserModel.findOne({
      username: dataInput.username,
    });
    if (userByUsername) {
      console.log({
        status: 'fail',
        message: `User with username:${dataInput.username} already exist`,
      });
      res.status(400).send({
        status: 'fail',
        message: `User with username:${dataInput.username} already exist`,
      });
      return;
    }

    // Insert data to db
    const insertData = await UserModel.create(dataInput);
    if (!insertData) {
      console.log({
        status: 'fail',
        message: `Add user Fail`,
      });
      res.status(400).send({
        status: 'fail',
        message: `Add user Fail`,
      });
      return;
    }

    console.log({
      status: 'success',
      message: `Add user Success`,
      data: dataInput,
    });
    res.send({
      status: 'success',
      message: `Add user Success`,
      data: dataInput,
    });
    return;
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error catch',
      message: error.message,
    });
  }
};

module.exports = { userSeed };
