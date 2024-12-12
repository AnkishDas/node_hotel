const testUserController = (req, res) => {

    try {
        res.status(200).send({
            success: true,
            message: "test user Data API",
        });
    } catch (error) {

    }

}

module.exports = { testUserController }