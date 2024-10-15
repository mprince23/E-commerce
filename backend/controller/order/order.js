const orderModel = require("../../models/orderProductModel")

async function orderController(req, res) {
    try {

        const currentUserId = req.userId

        const orderList = await orderModel.find({ userId: currentUserId }).sort({ createdAt: -1 })

        res.json({
            data: orderList,
            message: 'order List',
            success: true
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}


module.exports = orderController