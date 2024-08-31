const router = require('express').Router();

const authRouter = require('./authRouter')
const taskRouter = require('./tasksRouter');
const userRouter = require('./usersRouter');

router.use('/auth', authRouter)
router.use('/', taskRouter);
router.use('/user', userRouter);

module.exports = router;