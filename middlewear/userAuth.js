const {response} = require('express')
const jwt = require ('jsonwebtoken')
const getUserData = require('../helpers/helper')

const userAutheticate = (req,res,next)=>{
    if (req?.cookies?.userJwt){
    
        const isLoggedIn =jwt.verify(req.cookies.userJwt,"secretkey")
        if (isLoggedIn){
            const user= parseJwt(req.cookies.userJwt)
            console.log(user)
            getUserData(user.userID).then((response)=>{
                res.locals.userDetails = response[0]
            
            next();
        })
        }
        else{
            res.cookies('userJwt',null,{
                httpOnly:true,
                sameSite:'lax',
                secure:false,
                maxAge:1
            })
            res.cookies.userJwt = null
            res.redirect('/')
        }
    }
    else{
        res.redirect('/')
    }
}
module.exports= userAutheticate

function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
} 