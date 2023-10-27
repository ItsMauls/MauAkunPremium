const { User, Product, Category } = require('../models/index')
const { sumTotal } = require('../helper/helper');

class adminController {
    static async displayAdminProducts(req,res) {
        try {
            if(req.session.user) {
                const products = await Product.findAll()
                const currentUser = await User.findByPk(req.session.user.id)
                return res.render('admin/myProduct', {pageTitle: 'Admin products', currentUser, products, sumTotal})
            }
            res.redirect('/products')
        } catch (error) {
            res.send(error)
        }
    }
    static async displayAddAdminProducts(req,res) {
        try {
            const categories = await Category.findAll()
            const {error} = req.query
            let errMessageVal = ''
            if(error) {
                errMessageVal = error.split(',').join(' ')
            }
            if(req.session.user) {
            const currentUser = await User.findByPk(req.session.user.id)
            return res.render('admin/addProduct', {pageTitle: 'Add products', currentUser, categories, errMessageVal })
            }
            res.redirect('/products')
        } catch (error) {
            res.send(error)
        }
    }
    static async postAddAdminProducts(req,res) {
        try {
            const {name, categories, description, price} = req.body
 
            let imageUrl;
            if(!imageUrl) {
                imageUrl = ''
            }
            else{
                imageUrl = req.file.path      
            }
            await Product.create({name,categories, description, price,imageUrl})
            res.redirect('/products')
        } catch (err) {
            if(err.name === 'SequelizeValidationError') {
                let messageError = []
                err.errors.forEach(val => {
                    messageError.push(val.message)
                })
                res.redirect(`/admin/my-products/add-product?error=${messageError}`)
            } else {
                console.log(err);
                res.send(err)
            }
        }
    }

    static async deleteAdminProduct(req,res) {
        try {
            const { productId } = req.params
            await Product.destroy({
                where : {
                    id : productId
                }
            })
            res.redirect('/admin/my-products')
        } catch (error) {
            res.send(error.message)
        }
    }
    
    static async displayEditAdminProduct(req,res) {
        try {
            const {error} = req.query
            let errMessageVal = ''
            if(error) {
                errMessageVal = error.split(',').join(' ')
            }
            if(req.session.user) {
                const { productId } = req.params
                const currentUser = await User.findByPk(req.session.user.id)
                const previousData = await Product.findByPk(productId)
                return res.render('admin/editProduct', {pageTitle: 'Edit Product', currentUser, previousData, sumTotal, errMessageVal})
            }
            res.redirect('/products')
        } catch (error) {
            res.send(error.message)
        }
    }
    static async postEditAdminProduct(req,res) {
        try {
            
            const { productId } = req.params
            const {name, categories, description, price} = req.body
            await Product.update({name,categories,description,price}, {
                where : {
                    id : productId
                }
            })
            res.redirect('/admin/my-products')
        } catch (err) {
            const { productId } = req.params
            if(err.name === 'SequelizeValidationError') {
                let messageError = []
                err.errors.forEach(val => {
                    messageError.push(val.message)
                })
                res.redirect(`/admin/my-products/edit-product/${productId}/?error=${messageError}`)
            } else {
                console.log(err);
                res.send(err)
            }
        }
    }

    
    
}

module.exports = adminController