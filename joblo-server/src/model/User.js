const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8,
        select: true
    },
    admin: {
        type: Boolean,
        default: false
    },
},{timestamp:true} //kiểm tra xem user được thay đổi khi nào
)

 module.exports = mongoose.model('User', userSchema);