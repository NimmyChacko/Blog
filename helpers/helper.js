const USER=require('../models/userModel').users
const mongoose= require('mongoose')


const getUserData = (userId)=>{
    return USER.find({_id:userId},{password:0})
}


module.exports = getUserData