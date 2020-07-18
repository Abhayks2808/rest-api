const Product=require("../models/products");
const mongoose=require('mongoose');


exports.product_get_all = (req, res, next) => {
    Product.find()
        .select("name price _id productImage")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                product: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        productImage:doc.productImage,
                        request: {
                            type: 'GET',
                            url: `http://localhost:3000/products/${doc._id}`
                        }
                    }
                })
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}


exports.product_createProduct =  (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        productImage:req.file.path
    });
    product.save()
        .then(result => {
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: 'GET',
                        URL: `http://localhost:3000/products/${result._id} `
                    }
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.product_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select("name price _id productImage")
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        type: 'GET',
                        description: 'GET_ALl_PRODUCTS',
                        request: 'http://localhost:3000/products'
                    }
                })
            }
            else {
                res.status(404).json({
                    message: "no valid entry found for provided id"
                })

            }
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}

exports.product_updateproduct = (req, res, next) => {
    const id=req.params.productId;
    Product.findByIdAndUpdate(id,req.body)
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Product updated successfully',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/products/' + id
                }
            })
        })
}

exports.product_deleteproduct = (req, res, next) => {
    const id = req.params.productId;
    Product.deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: "Product deleted successfully",
                    type: 'POST',
                    description: "create new Product",
                    url: "http:/localhost:3000/products",
                    bodyofproduct: {
                        name: "String",
                        price: "Number"
                    }
                })
            }
            else {
                res.status(404).json({
                    message: 'No product found so cant be deleted'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}