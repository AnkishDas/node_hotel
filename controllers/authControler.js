const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const registerController = async (req, res) => {
    try {
        const { username, email, password, phone, address, answer } = req.body
        if (!username || !email || !password || !address || !phone || !answer) {
            return res.status(500).send({
                suceess: false,
                message: 'please provide all fields',

            })
        }
        const existing = await userModel.findOne({ email })
        if (existing) {
            return res.status(500).send({
                suceess: false,
                message: "already registered"
            })
        }

        //hashing
        var salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(password, salt)

        const user = await userModel.create({
            username,
            email,
            password: hashpassword,
            address,
            phone,
            answer,
        });

        res.status(201).send({
            success: true,
            message: "Successfully registered"
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess: false,
            message: 'error in register api',
            error
        });

    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'please provide email or password'
            })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'user not found'
            })
        }


        //check password

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "invalid credential",

            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d',
        });
        user.password = undefined;
        res.status(200).send({
            success: true,
            message: 'log in successfull',
            user,
            token
        })

    }
    catch (error) {
        console.log(error)

        res.status(500).send({
            success: false,
            massage: 'Error in log in API',
            error
        })
    }
}

module.exports = { registerController, loginController };
