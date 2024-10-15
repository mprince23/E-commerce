const productModel = require("../../models/productModel")

async function searchProduct(req, res) {
    try {

        const query = req.query.q

        const regex = new RegExp(query, 'i', 'g')

        const product = await productModel.find({
            "$or": [
                {
                    productName: regex
                },
                {
                    category: regex
                }
            ]
        })

        res.json({
            data: product,
            success: true,
            error: false,
            message: "Search Product list"
        })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}


module.exports = searchProduct