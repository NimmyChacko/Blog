const express = require('express')
const router= express.Router()
const app = express()

const {adLoginPage,adLogin,uploadPage,createBlog,adHomePage,deletePost,logout} = require('../controllers/adminController')
const { detailedView, getHomePage } = require('../controllers/userController')
// const logout =require('../controllers/userController')

router.get('/home', adHomePage)
router.post('/login',adLogin)
router.get('/uploads',uploadPage)
router.post('/createBlog',createBlog)
router.get('/',adLoginPage)
router.delete('/deletePost',deletePost)
router.post('/logout',logout)

module.exports = router