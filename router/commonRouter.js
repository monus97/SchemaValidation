const express = require("express");
const router = express.Router();
const user = require('./userRouter');
const product = require('./productRouter')


router.use('/user',user)

router.use('/product',product)

module.exports = router;