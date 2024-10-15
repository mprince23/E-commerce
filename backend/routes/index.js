const express = require('express')
const updateProductController = require('../controller/product/updateProduct')
const userSignUpController = require('../controller/user/usersignup')
const usersignincontroller = require('../controller/user/usersignin')
const authToken = require('../middleware/authToken')
const userDetails = require('../controller/user/userDetails')
const userLogout = require('../controller/user/userLogout')
const AllUsers = require('../controller/user/allUser')
const updateUser = require('../controller/user/updateUser')
const UploadProductController = require('../controller/product/uploadProduct')
const getProduct = require('../controller/product/getProduct')
const getCategoryProduct = require('../controller/product/getCategoryProduct')
const getCategoryWiseProduct = require('../controller/product/getCategoryWiseProduct')
const getProductDeta = require('../controller/product/getProductDeta')
const addToCart = require('../controller/user/addToCart')
const countAddToCartProduct = require('../controller/user/countAddToCartProduct')
const addToCartViweProduct = require('../controller/user/addToCartViweProduct')
const updateAddToCartProduct = require('../controller/user/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/user/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProduct = require('../controller/product/filterProduct')
const paymentController = require('../controller/order/payment')
const webhook = require('../controller/order/webhook')
const orderController = require('../controller/order/order')
const allOred = require('../controller/order/allOrder')
const router = express.Router()

router.post('/signup', userSignUpController)
router.post('/signin', usersignincontroller)
router.get('/userdetails', authToken, userDetails)
router.get('/userlogout', userLogout)

// ----------- admin panel ------------
router.get('/all-user', authToken, AllUsers)
router.post("/update-user", authToken, updateUser)

// ------------- product ---------------
router.post('/upload-product', authToken, UploadProductController)
router.get('/get-product', getProduct)
router.put('/edit-product', authToken, updateProductController)
router.get('/get-categoryProduct', getCategoryProduct)
router.post('/category-product', getCategoryWiseProduct)
router.post('/product-details', getProductDeta)
router.get('/search', searchProduct)
router.post('/filter-product', filterProduct)

// add to cart
router.post('/addtocart', authToken, addToCart)
router.get('/countAddToCartProduct', authToken, countAddToCartProduct)
router.get('/viwe-cart-product', authToken, addToCartViweProduct)
router.put('/update-cart-product', authToken, updateAddToCartProduct)
router.delete('/delete-cart-product', authToken, deleteAddToCartProduct)



// payment and order

router.post('/checkout', authToken, paymentController)
router.post('/webhook', webhook)
router.get('/order-list', authToken, orderController)
router.get('/all-order', authToken, allOred)


module.exports = router