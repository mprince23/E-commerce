const userModel = require("../../models/usermodel")

async function AllUsers(req, res) {
    try {
        // console.log("userid",req.userId)        

        const allUser = await userModel.find()

        res.json({
            message: "All User",
            data: allUser,
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

module.exports = AllUsers