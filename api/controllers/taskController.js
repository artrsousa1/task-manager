const TaskModel = require('../models/Task');
const TaskEnum = require('../enums/taskEnum');

const getTasks = async (req,res) => {
    try {
        const tasks = await TaskModel.findAll();
        res.status(200).send({
            message: 'Tasks retrieved successfully',
            data: tasks
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: TaskEnum.INTERNAL_SERVER_ERROR,
        })
    }
};

const createTask = async (req,res) => {
    try {
        const newTask = req.body;

        if(!newTask.title) {
            res.status(400).send({
                message: TaskEnum.BAD_REQUEST,
            });
        }

        await TaskModel.create(newTask);
        res.status(201).send({
            message: TaskEnum.CREATED,
            data: newTask
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: TaskEnum.INTERNAL_SERVER_ERROR,
            error: error
        });
    }
};

const updateTask = async (req,res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;

        const task = await TaskModel.findByPk(taskId);
        if(!task) {
            res.status(404).send({
                message: TaskEnum.NOT_FOUND,
            });
        }

        await task.update(updatedTask);
        res.status(200).send({
            message: TaskEnum.UPDATED,
            data: updatedTask
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: TaskEnum.DELETED,
            error: error
        })
    }
};

const deleteTask = async (req,res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findByPk(taskId);
        
        if(!task) {
            res.status(404).send({
                message: TaskEnum.NOT_FOUND,
            });
        }

        await task.destroy();
        res.status(200).send({
            message: TaskEnum.DELETED,
            data: task
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: TaskEnum.INTERNAL_SERVER_ERROR,
            error: error
        })
    }
}

module.exports = { getTasks, createTask, updateTask, deleteTask };