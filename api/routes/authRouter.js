const router = require('express').Router();
const authController = require('../controllers/authController')

router.post('/login', async (req,res) => await authController.loginUser(req,res));
router.post('/refresh', async (req,res) => await authController.auth(req,res));
router.get('/logout', async (req,res) => await authController.logout(req,res));

module.exports = router;
