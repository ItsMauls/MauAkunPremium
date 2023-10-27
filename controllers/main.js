const { Op } = require('sequelize');

const {Product, Cart, User, AdminAproval, Category, Profile} = require('../models/index');
const { sumTotal } = require('../helper/helper');

class mainController {
    static async allProducts(req,res) {
      const {search} = req.query
      
      let currentUser = ''
      let products
      const categories = await Category.findAll()
      if(search) {
    
        products = await Product.findAll({
          where : {
            name : {
              [Op.iLike] : `%${search}%`
            }
          }
        })
      } else {
        products = await Product.findAll()
      }
        
        if(req.session.user) {
            currentUser = req.session.user
        }

        res.render('index', {pageTitle : 'Products', isAuth : req.session.isLoggedIn, currentUser, products, categories,sumTotal})
    }
    static async addCart(req, res) {
        try {

          const { userId, productId } = req.params;
          let cartItem = await Cart.findOne({ where: { ProductId: productId, UserId: userId } });
          if(cartItem) {
            console.log('masuk');
            await Cart.increment('quantity', { by: 1, where :{
              ProductId: productId, UserId: userId
            } 
          })
          } else {
            await Cart.create({ ProductId: productId, UserId: userId, quantity : 1 });
          }
          res.redirect(`/products`);
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }

      static async listCart(req, res) {
        try {
          const { userId } = req.params;
          const cart = await Cart.findOne({
            where : {
              UserId : userId
            }
          })
          let totalPrice = 0
          if(cart) {
            if(cart.quantity > 0) {
              totalPrice = await cart.totalPrice();
            }
          }

          const data = await User.findOne({
            where: {
              id: {
                [Op.eq]: userId, // userId
              },
            },
            include: [
              {
                model: Product, Cart
              },
            ],
          });
          
          res.render("listCart", {
            data,
            userId,
            totalPrice,
            sumTotal
          });
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }

    
      // adminAproval
      static async adminApproval(req, res) {
        try {
          const { userId } = req.params;
          const data = await Cart.findAll({
            where: {
              UserId: {
                [Op.eq]: userId, // userId
              },
            },
            include: {
              model: Product,
            },
          });
          // res.send(data);
    
          const dataAproval = data.map((el) => {
            return {
              UserId: el.UserId,
              name: el.Product.name,
              description: el.Product.description,
              price: el.Product.price,
              status: false,
              code: "",
            };
          });
          // console.log(dataAproval);
    
          await AdminAproval.bulkCreate(dataAproval); // bulkCreate
    
          await Cart.destroy({
            where: {
              UserId: {
                [Op.eq]: userId, // userId
              },
            },
          });
    
          res.redirect(`/${userId}/product/cartlist`);
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
    
      // adminaAprove
      static async adminApprove(req, res) {
        try {
          const data = await AdminAproval.findAll();
          const balance = await AdminAproval.sum("price");
          const format = sumTotal(balance);
    
          res.render("admin/adminApprove", {
            data,
            format,
          });
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
    
      // updateStatus
      static async updateStatus(req, res) {
        try {
          const { id } = req.params;
          const code = Math.random().toString(36).substring(2, 13);
    
          await AdminAproval.update(
            { status: true, code: code },
            {
              where: {
                id: id,
              },
            }
          );
    
          res.redirect("/adminaAprove/");
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
    
      // profile
      static async profile(req, res) {
        try {
          const { userId } = req.params; // harus ada user
          // console.log(userId);
    
          const data = await User.findAll({
            where: {
              id: {
                [Op.eq]: userId
              }
            },
            include: [
              {
                model: Profile,
              },
            ],
          });
          // res.send(data)
      
          res.render("profile", {
            data,
          });
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
    
      // formProfiles & postProfiles
      static async formProfiles(req, res) {
        try {
          const {userId} = req.params
          res.render("formProfiles", {
            userId
          });
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
      static async postProfiles(req, res) {
        try {
          const { userId } = req.params; 
          const {name, phone, description} = req.body
          console.log(name, phone);
    
          const profiles = await Profile.findAll()
          if(profiles.length > 0){
            await Profile.update(
              { name: name, phone: phone, description: description, },
              {
                where: {
                  UserId: userId,
                },
              }
            );
          }
          else{
            await Profile.create({ name, phone, description, UserId: userId });
          }
    
          res.redirect(`/${userId}/profile`);
        } catch (error) {
          console.log(error);
          res.send(error);
        }
      }
}

module.exports = mainController