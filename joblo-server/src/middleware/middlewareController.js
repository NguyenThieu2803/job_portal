const jwt = require('jsonwebtoken');
const User = require('../model/User');



const middlewareControll = {
    //verify user is authenticated
    verifyUser: async (req,res,next) => {
        const token = req.headers.token
        if(token) {
            try {
                const accestoken = token.split(' ')[1]

                jwt.verify(accestoken,process.env.JWT_ACCESS_KEY,(err,User) => {
                    if(err) {
                        res.status(403).json({message: 'token not valid'})
                    }
                    req.user = User;
                    next();
                });
            } catch (error) {
                res.status(500).json("error", error)
            }

        }
        else {
            res.status(401).json({message: 'No access token, authorization denied'})
        }

    },
    //verify admin is authenticated
    verifyUserandAdmin: (req, res) => {
        middlewareControll.verifyUser(req, res,()=>{
            if(req.user._id === User._id || User.admin){
                next();
            }else{
                res.status(403).json({message: 'You not allowed to access this'})
            }
        })
    }
}



module.exports = middlewareControll