const addToCartModel = require("../../models/cartProduct")

async function addToCart(req, res) {
    try {
        const { productId } = req?.body

        const currentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({ productId, userId: currentUser })

        if (isProductAvailable) {
            return res.json({
                message: "Already exists in Add to cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quntity: 1,
            userId: currentUser,
        }

        const newAddToCart = new addToCartModel(payload)

        const saveProduct = await newAddToCart.save()

        res.json({
            message: "Product Add in Cart",
            success: true,
            error: false,
            data: saveProduct
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}


module.exports = addToCart