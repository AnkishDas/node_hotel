const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");
const { createrCatagorycontroler, getallcategoryController, updateCatcontroller, deleteCatcotroller } = require('../controllers/catagoryController');

const router = express.Router();

//get user data
router.post('/create', authMiddleware, createrCatagorycontroler)

router.get('/getAll', getallcategoryController)
router.put('/update/:id', authMiddleware, updateCatcontroller)
router.delete('/delete/:id', authMiddleware, deleteCatcotroller)




module.exports = router;