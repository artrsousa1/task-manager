module.exports = (sequelize, DataTypes) => {
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
    });
    
    return Task;
}