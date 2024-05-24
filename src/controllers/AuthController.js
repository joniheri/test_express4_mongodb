const { user: UserModel } = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const joi = require('joi');

const login = async (req, res) => {
  try {
    const dataInput = req.body;

    // Get user by username
    const userByUsername = await UserModel.findOne({
      username: dataInput.username,
    });
    if (!userByUsername) {
      return res.status(400).send({
        status: 'fail',
        message: `User with Username: ${dataInput.username} Not Found`,
      });
    }

    // Compare Password
    const comparePassword = await bcrypt.compare(
      dataInput.password,
      userByUsername.password
    );
    if (!comparePassword) {
      return res.status(400).send({
        status: 'fail',
        message: `Wrong Password`,
      });
    }

    // Make token
    const token = jwt.sign(
      {
        id: userByUsername._id,
        email: userByUsername.username,
        username: userByUsername.username,
        fullname: userByUsername.fullname,
      },
      process.env.ACCESS_SECRET_KEY
    );

    return res.send({
      status: 'success',
      message: `Login Success`,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error catch',
      message: error.message,
    });
  }
};

const checkToken = async (req, res) => {
  try {
    const dataInput = req.body;
    const dateNow = new Date();
    const jamSekarang = `${dateNow.getHours()}.${dateNow.getMinutes()}.${dateNow.getSeconds()}`;

    // ValidationInput
    const validationInput = joi.object({
      username: joi.string().required().min(5),
      password: joi.string().required().min(5),
    });
    const validationError = validationInput.validate(dataInput).error;
    if (validationError) {
      return res.status(400).send({
        status: 'fail',
        message: validationError.details[0].message,
      });
    }

    // Check username already exist
    const userByUsername = await UserModel.findOne({
      username: dataInput.username,
    });
    if (!userByUsername) {
      return res.status(400).send({
        status: 'fail',
        message: `User with email: ${dataInput.email} Not Found`,
      });
    }

    // ComparePassword
    const comparePassword = await bcrypt.compare(
      dataInput.password,
      userByUsername.password
    );
    if (!comparePassword) {
      return res.status(400).send({
        status: 'fail',
        message: `Wrong Password`,
      });
    }
    // End ComparePassword

    // MakeToken
    const token = jwt.sign(
      {
        id: userByUsername._id,
        email: userByUsername.username,
        username: userByUsername.username,
        fullname: userByUsername.fullname,
      },
      process.env.ACCESS_SECRET_KEY
    );
    // End MakeToken

    // InsertToTableLog
    // await LogModel.create({
    //   id: uuidv4(),
    //   userId: dataUserByEmail.id,
    //   timeLogin: jamSekarang,
    // });
    // End InsertToTableLog

    return res.send({
      status: 'success',
      message: `Check token Success`,
      user: {
        id: userByUsername._id,
        email: userByUsername.email,
        username: userByUsername.username,
        fullname: userByUsername.fullname,
      },
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error catch',
      message: error.message,
    });
  }
};

module.exports = { login, checkToken };
