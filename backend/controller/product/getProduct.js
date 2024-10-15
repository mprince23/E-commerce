const productModel = require("../../models/productModel")

async function getProduct(req, res) {
    try {

        const allPooduct = await productModel.find().sort({ createAt: -1 })

        res.json({
            message: "All Product",
            success: true,
            error: false,
            data: allPooduct
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}


module.exports = getProduct