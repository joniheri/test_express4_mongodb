const { user: UserModel } = require('../models/UserModel');
const jwt = require('jsonwebtoken');

exports.middleware = async (req, res, next) => {
  try {
    // Check Authorization On Header
    const header = req.header('Authorization');
    if (!header) {
      return res.status(400).send({
        status: 'fail',
        message: `Access Denied. Authorization required`,
      });
    }

    // CheckToken
    const token = header.replace('Bearer ', '');
    if (!token) {
      return res.status(400).send({
        status: 'fail',
        message: `Access Denied. Token required`,
      });
    }

    // VerifiedToken
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(403).send({
          status: 'fail',
          message: `Access Denied. Verify Token Fail`,
        });
      }
      console.log('token decode: ', decode);
      req.user = decode;
      return next();
    });
    // End VerifiedToken
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      status: 'fail',
      message: `Error catch`,
    });
  }
};

exports.middlewareLevel = (levels) => {
  return async (req, res, next) => {
    const userDecode = req.user;

    const userById = await UserModel.findOne({
      where: {
        id: userDecode.id,
      },
    });
    if (!userById) {
      return res.status(400).send({
        status: 'fail',
        message: `User with ID: ${userDecode.id} Not Found`,
      });
    }

    const userLevel = userById.level;

    if (!levels.includes(userLevel)) {
      return res.status(403).send({
        status: 'fail',
        message: `Akses ditolak`,
      });
    }

    return next();
  };
};
