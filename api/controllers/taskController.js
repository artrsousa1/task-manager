const TaskModel = require('../models/Task');

const getTasks = async (req,res) => {
    try {
        const tasks = await TaskModel.findAll();
        res.status(200).send({
            success: true,
            message: 'Tasks retrieved successfully',
            data: tasks
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}

const createTask = async (req,res) => {
    try {
        const newTask = req.body;
        await TaskModel.create(newTask);
        res.status(201).send({
            success: true,
            message: 'Task created successfully',
            data: newTask
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Internal server error'
        })
    }
}

module.exports = { getTasks };