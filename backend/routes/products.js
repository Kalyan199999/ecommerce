const express = require('express');
const upload = require('../middleware/upload');
const {verifyAdmin} = require('../middleware/admin');

const { addNewProduct , getProducts, getProductById, deleteProduct  } = require('../controllers/products')


const router = express.Router();

router.post('/post',verifyAdmin, upload.array('images',5) , addNewProduct)

router.get('/', getProducts);

router.get('/:id', getProductById);

router.delete('/:id', verifyAdmin, deleteProduct);

module.exports = router;