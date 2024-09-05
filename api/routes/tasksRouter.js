const router = require('express').Router();
const taskController = require('../controllers/taskController');
const { authenticateToken } = require('../services/authToken');

router.get('/task', authenticateToken, async (req, res) => await taskController.getTasks(req, res));
router.post('/task', authenticateToken, async (req, res) => await taskController.createTask(req, res));
router.put('/update_task/:id', authenticateToken, async (req, res) => await taskController.updateTask(req,res));
router.delete('/delete_task/:id', authenticateToken, async (req,res) => await taskController.deleteTask(req,res));

module.exports = router;
