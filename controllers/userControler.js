const userModel = require('../models/userModel'); // Adjust the path as necessary
const bcrypt = require('bcryptjs');
const getUserController = async (req, res) => {
    try {
        const userId = req.user.id; // Access the ID from req.user

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        user.password = undefined

        res.status(200).send({
            success: true,
            message: "user get successfully",
            user,
        });

        res.status(200).send
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in get user api',
            error
        })
    }
}

const updateUserControler = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).send({
                suceess: false,
                message: 'user not found',
            })
        }
        const { userName, address, phone } = req.body
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        await user.save();
        res.status(200).send({
            success: true,
            message: 'user updated successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in user Api',
            error
        })
    }
};

const updatePasswordController = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "user not found"
            })
        }
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                sucess: false,
                message: "please provide old or new password"
            })
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "invalid old password",

            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(newPassword, salt)

        user.password = hashpassword
        await user.save()
        res.status(200).send({
            success: true,
            message: "password updated",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            suceess: false,
            message: "error in password api",
            error
        })
    }
}

const resetPasswordControler = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "please provide all field"
            });
        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'user not foud or in'
            })
        }
        var salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hash(newPassword, salt)
        user.password = hashpassword
        await user.save();
        res.status(200).send({
            success: true,
            message: "password reset successfully",

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in password resetAPI",
            error
        })
    }
}


const deleteprofileController = async (req, res) => {
    try {

        const idToDelete = req.params.id;

        // Validate the ID format
        if (!idToDelete.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).send({
                success: false,
                message: "Invalid user ID format",
            });
        }
        // Validate the ID format
        const user = await userModel.findByIdAndDelete(idToDelete);

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found',
            });
        }

        res.status(200).send({
            success: true,
            message: 'User deleted successfully',
        });
    } catch (error) {
        console.error('Error in deleteprofileController:', error);
        res.status(500).send({
            success: false,
            message: 'Error in delete profile API',
            error: error.message,
        });
    }
}

module.exports = { getUserController, updateUserControler, updatePasswordController, resetPasswordControler, deleteprofileController };