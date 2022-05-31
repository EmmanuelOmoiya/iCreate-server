const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { registerUser, authUser, allUsers } = require('../controllers/userController');

router.route('/').post(registerUser).get(protect,  allUsers);
router.post('/login', authUser);
router.post('/signin', authUser);

module.exports = router; 
