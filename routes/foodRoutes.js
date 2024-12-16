const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");
const { createrfoodcontroler, getAllfoodcontroller, getsinglefoodbyid, getfoodbyrestrurent, updatefoodcontroller, deletefoodcontroller, placeOrdercontroller, orderstatuscontroller } = require('../controllers/foofController');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();


router.post('/create', authMiddleware, createrfoodcontroler)
router.get('/getall', getAllfoodcontroller)
router.get('/getsingle/:id', getsinglefoodbyid)
router.get('/getsinglebyresturant/:id', getfoodbyrestrurent)
router.put('/update/:id', updatefoodcontroller)
router.delete('/delete/:id', deletefoodcontroller)
router.post('/placeorder', authMiddleware, placeOrdercontroller)

router.post('/status/:id', authMiddleware, adminMiddleware, orderstatuscontroller)




module.exports = router;