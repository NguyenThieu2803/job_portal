const bcrypt = require('bcrypt');
const User = require('../model/User');
const connectDB = require('../config/ConnectDb');

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
    // Login
    loginUser: async (req, res) => {
        try {
            const { User } = await connectDB();

            const user = await User.findOne({ username: req.body.username });
            if (!user) return res.status(400).json({ message: 'User not found' });

            // Compare password
            const comparePassword = await bcrypt.compare(req.body.password, user.password);
            if (!comparePassword) return res.status(400).json({ message: 'Wrong password' });

            // User logged in
            res.status(200).json({ message: 'Login successful!', user });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

module.exports = authController;
