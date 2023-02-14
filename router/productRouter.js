const express = require('express');
const router = express.Router();
const product = require('../controller/productController')
const auth = require('../middleWares/authetication')
const {upload} = require('../middleWares/image')


// router.post('/api/v1/create',auth.verifyToken,upload.array('productPic',5),product.createProduct);

router.patch('/api/v1/update/:id',product.updateProduct);

router.delete('/api/v1/delete/:id',product.deleteProduct);

router.get('/api/v1/read',product.readProduct);

router.get('/api/v1/productdetails/:id',product.getProductById)

module.exports = router;