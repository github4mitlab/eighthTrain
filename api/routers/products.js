const express = require('express');
const router = express.Router() ;

const mongoose = require('mongoose');
const productModel = require('../models/product');
const checkAuth = require("../middleware/chech-auth");
const productController = require("../controller/product");

// Get All productInfo from DB
router.get('/', productController.products_get_all);

// Get Product Info through productId
router.get('/:productId', productController.products_get_product);

// POST Product Info to DB
router.post('/', checkAuth, productController.products_create_product);

// patch
router.patch('/', checkAuth, productController.products_update_product);

// Delete Product Info by productId
router.delete('/:productId', checkAuth, productController.products_delete_product);

module.exports = router;