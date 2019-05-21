const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/chech-auth");

const mongoose = require("mongoose");
const orderModel = require("../models/order");
const productModel = require("../models/product");
const orderController = require("../controller/order");


// Get All Order Info
router.get("/", checkAuth, orderController.orders_get_all);

// Get Order Info by OrderId Parameter
router.get("/:orderId", checkAuth, orderController.orders_get_order);

// Register Order Info - POST
router.post("/", checkAuth, orderController.orders_create_order);

// patch
router.patch("/", checkAuth, orderController.orders_modify_order);

// Delete Order Info by OrderId Parameter
router.delete("/:orderId", checkAuth, orderController.orders_delete_order);

module.exports = router;
