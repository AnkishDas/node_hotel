const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");
const { createrResturantcontroler, getAllresturantcontroller, getbyIdresturantControler, deleteresturantbyIdControler } = require('../controllers/resturantControler');

const router = express.Router();

//get user data

router.post('/create', authMiddleware, createrResturantcontroler)
router.get('/getAll', getAllresturantcontroller)
router.get('/getbyId/:id', getbyIdresturantControler)
router.delete('/deletebyId/:id', authMiddleware, deleteresturantbyIdControler)




module.exports = router;