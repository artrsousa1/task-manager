const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/register', async (req,res) => await userController.createUser(req,res));

module.exports = router;
