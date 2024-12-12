const express = require('express');
const { getUserController, updateUserControler, updatePasswordController, resetPasswordControler, deleteprofileController } = require('../controllers/userControler');

const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();

//get user data

router.get('/getuser', authMiddleware, getUserController);
router.put('/updateUser', authMiddleware, updateUserControler)
router.post('/updatePassword', authMiddleware, updatePasswordController);
// router.delete("/deleteuser/:id", deleteprofileController);
router.delete("/deleteuser/:id", deleteprofileController);


module.exports = router;