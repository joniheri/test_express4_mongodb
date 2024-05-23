const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { user: UserModel } = require('../models/UserModel');

const getUser = async (_, res) => {
  try {
    // Get Users
    const dataUsers = await UserModel.find();
    if (!dataUsers) {
      return res.status(401).send({
        status: 'fail',
        message: `Get user Fail`,
      });
    }

    return res.send({
      status: 'fuccess',
      message: `Get users Success`,
      data: dataUsers,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error catch',
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid ID format',
      });
    }

    // Get Users
    const dataUser = await UserModel.findById(id);
    if (!dataUser) {
      return res.status(401).send({
        status: 'fail',
        message: `Get user Fail`,
      });
    }

    return res.send({
      status: 'fuccess',
      message: `Get user by ID Success`,
      data: dataUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error catch',
      message: error.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const dataInput = req.body;

    // Check email already exist
    const userByEmail = await UserModel.findOne({ email: dataInput.email });
    if (userByEmail) {
      return res.status(400).send({
        status: 'fail',
        message: `User with email:${dataInput.email} already exist`,
      });
    }

    // Check username already exist
    const userByUsername = await UserModel.findOne({
      username: dataInput.username,
    });
    if (userByUsername) {
      return res.status(400).send({
        status: 'fail',
        message: `User with username:${dataInput.username} already exist`,
      });
    }

    // {Process insert data to db
    const insertData = await UserModel.create({
      email: dataInput.email,
      username: dataInput.username,
      password: await bcrypt.hash(dataInput.password, 10),
      fullname: dataInput.fullname,
    });
    if (!insertData) {
      return res.status(400).send({
        status: 'fail',
        message: `Add user Fail`,
      });
    }

    return res.send({
      status: 'euccess',
      message: `Success`,
      data: dataInput,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error catch',
      message: error.errors,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let dataInput;

    if (!req.body.password) {
      dataInput = {
        email: req.body.email,
        username: req.body.username,
        fullname: req.body.fullname,
      };
    } else {
      dataInput = {
        email: req.body.email,
        username: req.body.username,
        fullname: req.body.fullname,
        password: await bcrypt.hash(req.body.password, 10),
      };
    }

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid ID format',
      });
    }

    // Check ID user already exist
    const userById = await UserModel.findById(id);
    if (!userById) {
      return res.status(401).send({
        status: 'fail',
        message: `User not found`,
      });
    }

    // Process Update
    const updateUser = await UserModel.findByIdAndUpdate(id, dataInput, {
      new: true,
      runValidators: true,
    });
    if (!updateUser) {
      return res.status(401).send({
        status: 'fail',
        message: `Update data Fail`,
      });
    }

    return res.send({
      status: 'success',
      message: `Update user Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error catch',
      message: error.errors,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({
        status: 'fail',
        message: 'Invalid ID format',
      });
    }

    // Process Delete
    const deleteUser = await UserModel.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(401).send({
        status: 'fail',
        message: `Delete data Fail`,
      });
    }

    return res.send({
      status: 'success',
      message: `Delete user Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: 'error catch',
      message: error.errors,
    });
  }
};

module.exports = {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};
