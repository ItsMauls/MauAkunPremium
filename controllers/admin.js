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
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }
    static async displayAddAdminProducts(req,res) {
        try {
            const categories = await Category.findAll()
            if(req.session.user) {
            const currentUser = await User.findByPk(req.session.user.id)
            return res.render('admin/addProduct', {pageTitle: 'Add products', currentUser, categories})
            }
            res.redirect('/')
        } catch (error) {
            res.send(error)
        }
    }
    static async postAddAdminProducts(req,res) {
        try {
            const {name, categories, description, price} = req.body
            
            const imageUrl = req.file.path
            
            await Product.create({name,categories, description, price,imageUrl})
            res.redirect('/')
        } catch (error) {
            res.send(error.message)
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
            if(req.session.user) {
                const { productId } = req.params
                const currentUser = await User.findByPk(req.session.user.id)
                const previousData = await Product.findByPk(productId)
                return res.render('admin/editProduct', {pageTitle: 'Edit Product', currentUser, previousData, sumTotal})
            }
            res.redirect('/')
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
        } catch (error) {
            res.send(error.message)
        }
    }

    
    
}

module.exports = adminController