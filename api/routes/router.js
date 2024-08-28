const router = require('express').Router();

const taskRouter = require('./tasksRouter');

router.use('/', taskRouter);

module.exports = router;