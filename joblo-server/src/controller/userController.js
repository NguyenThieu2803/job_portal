
const User = require('../model/User')




const userController = {
    //Get All users
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find()
            return res.status(200).json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    },

    //Delete a user by ID
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id)
            return res.status(200).json({message:"Delete user successfully"})
        } catch (error) {
            return res.status(500).json(error)
        }
    }

}

module.exports = userController;