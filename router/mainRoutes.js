const { allProducts, addCart, listCart } = require('../controllers/main')
const router = require('express').Router()

router.get('/', allProducts)
router.get("/:userId/product/cartList", listCart);
router.get("/:userId/product/cart/:productId", addCart);

module.exports = router