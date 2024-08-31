const router = require('express').Router();
const authController = require('../controllers/authController')

router.post('/login', async (req,res) => await authController.loginUser(req,res));

module.exports = router;
