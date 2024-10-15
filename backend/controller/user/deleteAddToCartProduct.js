const addToCartModel = require("../../models/cartProduct")

async function deleteAddToCartProduct(req, res) {
    try {

        const currentUserId = req.userId
        const addToCartProductId = req.body._id

        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId })

        res.json({
            data: deleteProduct,
            success: true,
            error: false,
            message: "Product Deleted Successfully"
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}


module.exports = deleteAddToCartProduct