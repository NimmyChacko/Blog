const mongoose= require('mongoose')
const blogSchema = mongoose.Schema({
    heading:{
        type:String,
    required:true,
default:"No Heading"
},

createdAt:{
    type:Date,
    default:new Date()
},

 createdBy:{
 type:mongoose.Types.ObjectId,
 ref:"users"
 },


content:{
    type:String,
    required:true
},
images:[]
})

const blogs = mongoose.model("blogs",blogSchema)

module.exports = blogs
