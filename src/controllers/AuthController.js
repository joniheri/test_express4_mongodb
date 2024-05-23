const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user: UserModel } = require('../models/UserModel');

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

module.exports = { login };
