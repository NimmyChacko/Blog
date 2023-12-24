const multer =require('multer')
const BLOGS =require('../models/blogSchema')
const fs = require('fs')
const path=require('path')

const adLoginPage =(req,res)=>{
  if(req.cookies.adminJwt){
      res.redirect('/admin/home')}
      else{
          res.render('admin/login.hbs')
      }
  }
  


const uploadPage = (req, res) => {
    res.render('admin/upload.hbs')

}

const createBlog =(req,res)=>{
    const fileStorage = multer.diskStorage({
        destination:(req,file,callback)=>{
           callback(null,"public/uploads");
        },filename:(req,files,cb) =>{
            cb(null,Date.now()+ "-"+ files.originalname)
        },
    })

    const upload = multer({ storage: fileStorage }).array("images", 4);
    
      upload(req,res,(err) => {
        if (err) {
          console.log("File upload error");
        } else {
          BLOGS({
            heading: req.body.title,
            content: req.body.content,
            images: req.files,
          })
            .save().then((respose) => {
              res.redirect("/admin/uploads");
            });
        }
      });
};
  
const adLogin = (req,res)=>{
  USER.find({
      email:req.body.email,
      password:req.body.password
  }).then((response) =>{
     if (response.length>0){
      const token = jwt.sign({userID:response[0]._id},"secretkey",{expiresIn:'2d'})
      res.cookie('adminJwt',token,{
          httpOnly:true,
          sameSite:'lax',
          secure:false,
          maxAge:24*60*60*1000
      })
      res.status(200).json({login:true})
     }
     else
     {res.json({login:false})}
  })
}

    

const adHomePage = (req,res) =>{
    BLOGS.find().then((response) => {
      // console.log(response)
      res.render('admin/home.hbs',{data:response})
    })

  }
  
const deletePost =(req,res)=>{
    // console.log(req)
    BLOGS.findOne({_id:req.body.postId})
    .then((selectedFileData)=>{
        console.log(selectedFileData)
  
    BLOGS.deleteOne({_id:req.body.postId}).then((resp)=>{
        for(let i=0;i<selectedFileData.images.length;i++){
            const filePath = path.join(__dirname,'..','public/uploads',selectedFileData.images[i].filename)
            fs.unlink(filePath,(err)=>{
              console.log(err)
            })
        }
      
        res.json({delete:true})
    }).catch(err=>{
    res.json({delete:false})
})

})
}

const logout = (req,res)=>{
  res.cookie('adminJwt',null,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,
      maxAge:1 
  })
  req.cookies.adminJwt=null
  res.redirect('/admin/login')
}



module.exports ={adLoginPage,adLogin,uploadPage,createBlog,adHomePage,deletePost,logout}