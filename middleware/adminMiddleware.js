const userModel = require('../models/userModel')
module.exports = async (req, res, next) => {
    try {

        if (!req.user) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized: No user data found",
            });
        }
        const user = await userModel.findById(req.body.id)
        if (req.user.usertype !== 'admin') {
            console.log("AdminMiddleware Error: User is not an admin", req.user);
            return res.status(401).send({
                success: false,
                message: 'only admin access'
            })
        }
        else {
            next();
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "un authorised access",
            error
        })

    }
}