const UserModel = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserLoginInput } = require('../validators/userValidator');
require('dotenv').config()

const loginUser = async (req,res) => {
    try {
        const { error, value } = UserLoginInput.validate(req.body);
        if(error) {
            return res.status(400).send({
                message: error.message,
                data: req.body
            });
        }

        const { username, password } = value;
        const user = await UserModel.findOne({
            where: { username: username }
        })

        if(!user) {
            return res.status(400).send({
                message: 'Username or password is incorrect.'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send({
                message: 'Username or password is incorrect.'
            })
        }

        const token = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        res.status(200).send({
            message: 'Login successfull.',
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Internal server error.'
        });
    }
}

module.exports = { loginUser };