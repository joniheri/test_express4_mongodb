const express = require('express');
const router = express.Router();

// Import seeder
const { userSeed } = require('../seeders/UserSeeder');

// Import middleware
const {
  middleware,
  middlewareLevel,
} = require('../middlewares/AuthMiddleware');

// Import controllers
const {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/UserController');
const { login, checkToken } = require('../controllers/AuthController');

// User Seeder Router
router.post('/user-seed', userSeed);

// User Router
router.get('/users', getUser);
router.get('/user/:id', getUserById);
router.post('/user', addUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

// Auth Router
router.post('/login', login);
router.post('/check-token', middleware, checkToken);

module.exports = router;
