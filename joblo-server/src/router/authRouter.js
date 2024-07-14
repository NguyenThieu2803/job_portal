const authController = require('../controller/AuthController');
const userController = require('../controller/userController');


 const express = require('express');
const middlewareControll = require('../middleware/middlewareController');

 const router = express.Router();


router.post('/register',authController.registerUser)
router.post('/login',authController.loginUser)
// router.post('/logout',authController.logoutUser)
router.get('/getAllUser',middlewareControll.verifyUser,userController.getAllUsers)
router.delete('/getAllUser/:id',userController.deleteUser)

module.exports = router

