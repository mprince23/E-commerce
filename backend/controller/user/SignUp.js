const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');


async function userSignUpController(req, res) {
    try {
        const { name, email, password } = req.body

        const user = await userModel.findOne({ email })

        if (user) {
            throw new Error("Already user exits.")
        }

        if (!name) {
            throw new Error("Please Provide Name")
        }

        if (!email) {
            throw new Error("Please provide either an email or a phone number.");
        }

        if (!password) {
            throw new Error("Please Provide Password")
        }


        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something is wrong")
        }

        const payload = {
            ...req.body,
            role: "GENERAL",
            password: hashPassword
        }
        
        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.json({ data: saveUser, status: 201, success: true, error: false, message: 'User Create Successfully!' })

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false,
        })
    }
}


module.exports = userSignUpController