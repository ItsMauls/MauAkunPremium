const { allProducts, addCart, listCart } = require('../controllers/main')
const router = require('express').Router()

router.get("/", (req, res) => {
    res.render("landingPage")
  })
  
router.get('/products', allProducts)
router.get("/:userId/product/cartList", listCart);
router.get("/:userId/product/cart/:productId", addCart);

module.exports = router