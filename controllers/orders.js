const mongoose = require('mongoose');
const Order = require('../models/orders');
const Product =require('../models/products');

exports.orders_get_all = (req, res, next) => {
    Order.find()
        .select("product quantity")
        .populate({ path: 'product', select: 'name price' })
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: `http://localhost:3000/orders/${doc.id}`
                        }
                    }
                })
            })
        })
        .catch(err => {
            res.status(200).json({
                error: err
            })
        })
}


exports.order_createorder = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(400).json({
                    message: "product not found"
                })
            }
            const order = new Order({
               
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save()
        })
        .then(result => {

            res.status(201).json({
                message: "Order stored",
                createdOrder: {
                    id:result.id,
                    quantity: result.quantity,
                    product: result.product
                },
                request: {
                    type: "GET",
                    Url: `http://localhost:3000/orders/${result.id}`
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                message: "product not found",
                error: err
            })
        })
}

exports.order_getorder=(req, res, next) => {
    Order.findById(req.params.orderId)
      .populate('product')
        .exec()
        .then(order => {
            if (!order) {
                res.status(404).json({
                    message: "Order not found"
                })
            }
            else {
                res.status(200).json({
                    order: order,
                    request: {
                        type: "GET",
                        URL: "http://localhost:3000/orders"
                    }
                })
            }

        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.order_deleteorder =  (req, res, next) => {
    const id = req.params.orderId;
    Order.deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "order deleted successfully",
                    type: 'POST',
                    description: "place new Order",
                    url: "http:/localhost:3000/orders",
                    bodyoforder: {
                        productId: "ID",
                        quantity: "Number"
                    }
                })
            }
            else {
                res.status(404).json({
                    message: 'No order found so cant be deleted'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

