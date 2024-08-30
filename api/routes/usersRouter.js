const router = require('express').Router();
const userController = require('../controllers/userController');

router.post('/auth/register', async (req,res) => await userController.createUser(req,res));
router.post('/auth/login', async (req,res) => await userController.loginUser(req,res));

module.exports = router;
