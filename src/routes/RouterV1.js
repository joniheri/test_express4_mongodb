const express = require('express');
const router = express.Router();

// Import seeder
const { userSeed } = require('../seeders/UserSeeder');

// Import controllers
const {
  getUser,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require('../controllers/UserController');

// User Seeder Router
router.post('/user-seed', userSeed);

// User router
router.get('/users', getUser);
router.get('/user/:id', getUserById);
router.post('/user', addUser);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

module.exports = router;
