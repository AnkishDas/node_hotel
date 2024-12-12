const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");
const { createrfoodcontroler, getAllfoodcontroller, getsinglefoodbyid, getfoodbyrestrurent } = require('../controllers/foofController');
const router = express.Router();


router.post('/create', authMiddleware, createrfoodcontroler)
router.get('/getall', getAllfoodcontroller)
router.get('/getsingle/:id', getsinglefoodbyid)
router.get('/getsinglebyresturant/:id', getfoodbyrestrurent)


module.exports = router;