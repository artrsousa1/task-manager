const router = require('express').Router();
const taskController = require('../controllers/taskController');

router.get('/task', async (req, res) => await taskController.getTasks(req, res));

module.exports = router;
