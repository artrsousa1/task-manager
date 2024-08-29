const router = require('express').Router();

const taskRouter = require('./tasksRouter');
const userRouter = require('./usersRouter');

router.use('/', taskRouter);
router.use('/', userRouter);

module.exports = router;