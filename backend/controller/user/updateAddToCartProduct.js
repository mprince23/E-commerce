const addToCartModel = require("../../models/cartProduct")

async function updateAddToCartProduct(req, res) {
    try {

        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id

        const qty = req.body.quntity

        const updateProduct = await addToCartModel.updateOne({ _id: addToCartProductId }, {
            ...(qty && { quntity: qty })
        })

        res.json({
            message: "Product Updated",
            data: updateProduct,
            success: true,
            error: false
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}



module.exports = updateAddToCartProduct