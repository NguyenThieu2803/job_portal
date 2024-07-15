const bcrypt = require('bcrypt');
const User = require('../model/User');
const connectDB = require('../config/ConnectDb');
const jwt = require('jsonwebtoken');


let freshTokenStorage = []
const authController = {
    // Register
    registerUser: async (req, res) => {
        try {
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(req.body.password, salt);
            // const {User} = await connectDB();
            // Create User
            const newUser = {
                username: req.body.username,
                email: req.body.email,
                password: hashed

            }

            // Save user to the database
            await User.create(newUser)
            res.status(201).json({ message: 'User registered successfully!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    //GENERATE ACCESS TOKEN 
    generateAcessToken: (user) => {
        return jwt.sign({
            id: user._id,
            admin: user.admin
        },  process.env.JWT_ACCESS_KEY,
            { expiresIn: '20s' })
    },

//GENERATE REFRESH TOKEN
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user._id,
            admin: user.admin
        },  process.env.JWT_FRESH_KEY,
            { expiresIn: '7d' })
    },

    // Login
    loginUser: async (req, res) => {
        try {

            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(400).json({ message: 'User not found' });

            // console.log(req.body.username)
            // console.log(req.body.password)
            // console.log(user)
            // Compare password
            const comparePassword = await bcrypt.compare(req.body.password, user.password);
            if (!comparePassword) return res.status(400).json({ message: 'Wrong password' });
            else if (user && comparePassword) {


                // Create and sign token
                const accesstoken = authController.generateAcessToken(user)
                const refreshToken = authController.generateRefreshToken(user)
                res.cookie('freshtoken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: "strict"
                })
                const { password, ...others } = user._doc;
                res.status(200).json({ message: 'Login successful!', accesstoken, ...others });
            }

            // User logged in

        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    },

    //get fresh token from cookie

    getFreshToken: async (req, res) => {
        try {
            const refreshToken = req.cookies.freshtoken;
            console.log(refreshToken);
            //check if the refresh token null
            if (!refreshToken) return res.status(403).json("You are not authorized to refresh");

            //check if the refresh token is in use
            if (freshTokenStorage.includes(refreshToken)) return res.status(403).json("Refresh token is already in use");

            //verify the refresh token with the secret key  and get the user data from it
            jwt.verify(refreshToken, process.env.JWT_FRESH_KEY, (err, user) => {
                if (err) 
                {console.log(err)}

                //loai bo token cu
                freshTokenStorage = freshTokenStorage.filter(token => token !== refreshToken);


                const newAccessToken = authController.generateAcessToken(user)
                const newFreshenToken = authController.generateRefreshToken(user)
                freshTokenStorage.push(refreshToken)
                res.cookie('freshtoken', newFreshenToken, {
                    httpOnly: true,
                    secure: false,
                    path: '/',
                    sameSite: "strict"
                });
                res.status(200).json({ accessToken: newAccessToken })
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    },



    //logout 
    logoutUser: (req,res)=>{
        try {
            res.clearCookie('freshtoken')
            res.status(200).json({ message: 'Logged out successfully!' })
        } catch (error) {
            console.log(error)
        }
    }

};

module.exports = authController;
