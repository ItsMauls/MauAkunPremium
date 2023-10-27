const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()
const multer = require('multer')
const { User } = require('./models/index')
const authRoutes = require('./router/authRoutes')
const adminRoutes = require('./router/adminRoutes')
const mainRoutes = require('./router/mainRoutes')
const profile = require('./router/profileRoutes')


app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

const fileStorage = multer.diskStorage({
    destination : (req,file,cb) => {
      cb(null,'images')
    } ,
    filename : (req,file,cb) => {
      cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`)
    }
  })
  
  const fileFilter = (req,file,cb) => {
    if(
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
      ) {
     cb(null,true)
    } else {
    cb(null,false)
    }
  }
  
app.use(multer({storage : fileStorage ,fileFilter : fileFilter}).single('imageUrl'))
app.use('/images',express.static(path.join(__dirname, 'images')));

app.set('view engine', 'ejs')

app.use(session({
    secret : 'mysecret',
    resave : false, 
    saveUninitialized : false})
)

app.use(async (req,res,next) => {
    try {
        if(!req.session.user) {
        return next()
    }
    const user = await User.findByPk(req.session.user._id)
    req.user = user
    next() }
    catch (err) {
        console.log(err)
    } 
})

app.use((req,res,next) => {
    res.locals.isAuth = req.session.isLoggedIn
    next()
})

app.use(authRoutes)
app.use(mainRoutes)
app.use(profile)
app.use('/admin', adminRoutes)




app.listen(3000)