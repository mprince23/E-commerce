const orderModel = require("../../models/orderProductModel")
const userModel = require("../../models/usermodel")

async function allOred(req, res) {

    const userId = req.userId

    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return res.status(500).json({
            message: 'Not Access'
        })
    }

    const AllOrder = await orderModel.find().sort({ createdAt: -1 })

    res.status(200).json({
        data: AllOrder,
        success: true
    })

}



module.exports = allOred