const bcrypt = require('bcrypt')

const User = require('../model/User')



const authController = {
    //Register
    registerUser: async (req, res) => {
        try {
            //hash password
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(req.body.password, salt);

            //Created User
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashed
            });

            //Save user to the database
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully!' });
        } catch (error) {
            console.log(error);
        }
    },
    //Login
    LoginUser: async (req, res) => {
        try {
            const user = User.findOne({ username: req.body.username })
            if (!user) return res.status(400).json({ message: 'User not found' });

            //compare password
            const comparePassword = await bcrypt.compare(user.password, req.body.password);
            if (!comparePassword) return res.status(400).json({ message: 'Password Wrong' });


            //user right now
            if (user && comparePassword) res.status(200).json({ message: 'lOGIN SUCCESSFUL!' }, user);


        } catch (consoleError) {
            res.status(500).json(err);
        }
    }



}




module.exports = authController;