const UserModel = require('../models/Users');
const bcrypt = require('bcrypt');
const { UserCreateInput } = require('../validators/userValidator');
const { Op } = require('sequelize');
require('dotenv').config()

const createUser = async (req, res) => {
    try {
        const { error, value } = UserCreateInput.validate(req.body);
        if (error) {
            return res.status(400).send({
                message: error.message,
                body: req.body
            });
        }
        const { firstName, lastName, username, email, password } = value;
        const user = await UserModel.findOne({
            where: {
                [Op.or]: [{ username }, { email }]
            }
        });
        if (user) {
            return res.status(400).send({
                message: 'User already exists.'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await UserModel.create({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword
        });
        res.status(201).send({
            message: 'User created successfully.'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Internal server error.'
        });
    }
};

module.exports = { createUser };