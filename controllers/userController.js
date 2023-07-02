const userModel = require('../models/userModels')

const loginController = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send("user not found");
        }
        res.status(200).json({success:true,user});
    } catch (error) {
        res.status(400).json({
            success: false,
            error,
        })
    }

};

const registerController = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name) {
            res.status(400).json({
                success: false,
                message: "name is required"
            });
            return;
        }
        if (!email) {
            res.status(400).json({
                success: false,
                message: "email is required"
            });
            return;
        }
        if (!password) {
            res.status(400).json({
                success: false,
                message: "password is required"
            });
            return;
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: "Already registered"
            });
            return;
        }
        const newUser = await new userModel({ name, email, password }).save();

        res.status(201).json({
            success: true,
            newUser
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message:"something went wrong",
            error
        });
    }
};




module.exports = {
    loginController,
    registerController
}