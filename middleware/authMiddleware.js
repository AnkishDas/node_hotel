const JWT = require('jsonwebtoken')

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        // Check if Authorization header exists and starts with "Bearer"
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized: Missing or malformed token",
            });
        }
        const token = req.headers["authorization"].split(' ')[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'in-authorize user'
                })
            }
            else {
                req.user = decode;
                next()
            }
        })

    }
    catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in auth api',
            error
        })
    }
}

