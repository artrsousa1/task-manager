const { User } = require('../models');
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
        const user = await User.findOne({
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

        const token = jwt.sign({id: user.id, username: user.username}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        res.cookie('accessToken', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: 'false'
        });
        
        res.status(200).send({
            message: 'Login successfull.',
            user: {
                firstName: user.firstName,
                email: user.email,
                accessToken: token
            }
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Internal server error.'
        });
    }
}

const auth = async (req,res) => {
    try {
        if(!req.headers.cookie) {
            return res.status(401).send({
                message: 'Unauthorized.'
            })
        }
        let token;

        req.headers.cookie.split(';').forEach(element => {
           const [ key, value ] = element.trim().split('=');
              if(key === 'accessToken') {
                token = value
              }
        });
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
            if(err) {
                return res.status(403).send({
                    message: 'Forbidden.'
                })
            }

            const userContent = await User.findOne({
                where: { id: user.id }
            })

            if(!userContent) {
                return res.status(404).send({
                    message: 'User not found.'
                })
            }

            res.status(200).send({
                message: 'Authorized.',
                user: {
                    access: token,
                    first_name: userContent.firstName,
                    email: userContent.email
                }
            })
        })
    } catch(error){
        console.log(error);
        res.status(500).send({
            message: 'Internal server error.'
        })
    }
}

const logout = async (req,res) => {
    try {
        res.clearCookie('accessToken');
        res.status(200).send({
            message: 'Logout successfull.'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Internal server error.'
        })
    }
}

module.exports = { loginUser, auth, logout };