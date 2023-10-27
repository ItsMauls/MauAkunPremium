const { User } = require('../models/index')
const bcrypt = require('bcryptjs')
const { createTransport } = require('nodemailer');

class AuthController {
    
static async getSignup(req,res) {
    try {
        res.render('auth/signup', {isAuth : false, pageTitle : 'Signup'})
    } catch (error) {
        res.send(error)
    }
}

static async postSignup(req,res) {
    try {   
        const transporter = createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        auth: {
            user: "maulputra09@gmail.com",
            pass: "RgdKhwT8tCFQUJHm",
        },
      });
        
        const {email, username, password} = req.body
        const hashedPassword = await bcrypt.hash(password, 12)
        // console.log(hashedPassword);
        await User.create({username, password: hashedPassword, email, role: "test"})

        await transporter.sendMail({
            from: 'mauAkunPremium@gmail.com',
            to: email,
            subject: `Welcome Our Priority Customer`,
            html : '<h1> Selamat Datang di MAP, disini kamu bisa beli akun mulai Netflix sampai ChatGPT  </h1>' 
           })
            res.redirect('/login')
    } catch (error) {
        res.send(error.message)
    }
}

static async getLogin(req,res) {
    try {
        res.render('auth/login', {isAuth : false, pageTitle : 'Login'})
    } catch (error) {
        res.send(error)
    }
}

static async postLogin(req,res) {
    const {username, password} = req.body
    
    const user = await User.findOne({where : {
        username : username
    }})
    const isPasswordEqualToHashedPassword = await bcrypt.compare(password, user.password)
    console.log(isPasswordEqualToHashedPassword);
    if(!isPasswordEqualToHashedPassword) {
        return res.send('password tidak sama!')
    }
    req.session.user = user
    req.session.isLoggedIn = true
    res.redirect('/')
}

static async postLogout(req,res) {
    await req.session.destroy()
    res.redirect('/')
}

static async getEmail(req,res) {
 
}

}

module.exports = AuthController