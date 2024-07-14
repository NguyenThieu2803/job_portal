const mongoose = require('mongoose');
require('dotenv').config();

const connectDB2 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI_ACCESS, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB2;
