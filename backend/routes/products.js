const express = require('express');
const upload = require('../middleware/upload');
const {verifyAdmin} = require('../middleware/admin');

const { addNewProduct , getProducts, getProductById, deleteProduct,updateProduct } = require('../controllers/products')


const router = express.Router();

router.post('/post', verifyAdmin, upload.array('images',5) , addNewProduct)

router.get('/', getProducts);

router.get('/:id', getProductById);

router.put('/:id', verifyAdmin, upload.array('images', 5), updateProduct);

router.delete('/:id', verifyAdmin, deleteProduct);

module.exports = router;