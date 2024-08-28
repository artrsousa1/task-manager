const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'done'),
        defaultValue: 'pending',
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    }
    // Adicionar relação com usuário depois
});

module.exports = Task;