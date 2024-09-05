const { Task } = require('../models');
const TaskEnum = require('../enums/taskEnum');
const { where } = require('sequelize');

const getTasks = async (req,res) => {
    try {
        const tasks = await Task.findAll({
            where: { UserId: req.user.id }
        });
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
        const { title, status, description } = req.body;
        const userId = req.user.id;

        if(!title) {
            res.status(400).send({
                message: TaskEnum.BAD_REQUEST,
            });
        }
        await Task.create({
            title,
            status,
            description,
            UserId: userId
        });
        res.status(201).send({
            message: TaskEnum.CREATED,
            data: { title, status, description }
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

        const task = await Task.findByPk(taskId);
        if(!task) {
            res.status(404).send({
                message: TaskEnum.NOT_FOUND,
            });
        }

        if(task.UserId !== req.user.id) {
            res.status(403).send({
                message: TaskEnum.FORBIDDEN,
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
        const task = await Task.findByPk(taskId);
        
        if(!task) {
            res.status(404).send({
                message: TaskEnum.NOT_FOUND,
            });
        }

        if(task.UserId !== req.user.id) {
            res.status(403).send({
                message: TaskEnum.FORBIDDEN,
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