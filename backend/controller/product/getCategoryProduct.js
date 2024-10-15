const productModel = require("../../models/productModel")


async function getCategoryProduct(req, res) {
    try {
        console.log("Hello I am calling");

        const productCategory = await productModel.distinct("category")

        console.log("category", productCategory)

        const productByCategory = []  //array to store one product from each category

        for (const category of productCategory) {
            const product = await productModel.findOne({ category: category })

            if (product) {
                productByCategory.push(product)
            }
        }

        res.json({
            message: "category product",
            data: productByCategory,
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


module.exports = getCategoryProduct