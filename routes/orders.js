const express = require('express');
const router = express.Router();
const CheckAuth = require('../middleware/check-auth');
const OrderController=require("../controllers/orders");

// handle incoming GET requests to /orders
router.get('/',CheckAuth,OrderController.orders_get_all);

// handle incoming POST request to /orders
router.post('/',CheckAuth,OrderController.order_createorder);

//handle incoming GET request to /:orderId
router.get('/:orderId', CheckAuth,OrderController.order_getorder);


//handle incoming delete request to /:orderId
router.delete('/:orderId',CheckAuth,OrderController.order_deleteorder);

module.exports = router;