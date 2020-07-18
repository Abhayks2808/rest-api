const express = require('express');
const router = express.Router();
const multer = require('multer');
const ProductController=require('../controllers/products');
const checkAuth=require('../middleware/check-auth');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + '-' + file.originalname)
    }
})
const filefilter = (req, file, cb) => {

    if (file.mimetype === 'images/jpeg' || file.mimetype === 'images/png') {
        //accept afile      
        cb(null, true);
    }
    else {
        //reject a file
        cb(null, false);
    }

};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    filefilter: filefilter
});


//handle incoming get request to /Products
router.get('/',ProductController.product_get_all);

// handle incoming Post request to /Products
router.post('/',checkAuth,upload.single('productImage'),ProductController.product_createProduct);

//handle incoming Get request to /ProductsId
router.get('/:productId',ProductController.product_get_product); 

//handle incoming Patch request to /ProductId
router.patch('/:productId', checkAuth,ProductController.product_updateproduct);
//handle incoming delete request to /ProductId
router.delete('/:productId', checkAuth,ProductController.product_deleteproduct);

module.exports = router