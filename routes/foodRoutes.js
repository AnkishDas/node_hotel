const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");
const { createrfoodcontroler, getAllfoodcontroller, getsinglefoodbyid, getfoodbyrestrurent, updatefoodcontroller, deletefoodcontroller, placeOrdercontroller } = require('../controllers/foofController');
const router = express.Router();


router.post('/create', authMiddleware, createrfoodcontroler)
router.get('/getall', getAllfoodcontroller)
router.get('/getsingle/:id', getsinglefoodbyid)
router.get('/getsinglebyresturant/:id', getfoodbyrestrurent)
router.put('/update/:id', updatefoodcontroller)
router.delete('/delete/:id', deletefoodcontroller)
router.post('/placeorder', authMiddleware, placeOrdercontroller)





module.exports = router;