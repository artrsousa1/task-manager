const router = require('express').Router();
const taskController = require('../controllers/taskController');

router.get('/task', async (req, res) => await taskController.getTasks(req, res));
router.post('/task', async (req, res) => await taskController.createTask(req, res));
router.put('/update_task/:id', async (req, res) => await taskController.updateTask(req,res));
router.delete('/delete_task/:id', async (req,res) => await taskController.deleteTask(req,res));

module.exports = router;
