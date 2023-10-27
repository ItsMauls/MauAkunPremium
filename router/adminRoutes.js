const { displayAdminProducts, displayAddAdminProducts, postAddAdminProducts, deleteAdminProduct, displayEditAdminProduct, postEditAdminProduct } = require('../controllers/admin')
const { adminApprove, updateStatus, listCart, adminAproval, adminApproval } = require('../controllers/main')

const router = require('express').Router()

router.get('/my-products', displayAdminProducts)

router.get('/my-products/add-product', displayAddAdminProducts)
router.post('/my-products/add-product', postAddAdminProducts)

router.get('/my-products/edit-product/:productId', displayEditAdminProduct)
router.post('/my-products/edit-product/:productId', postEditAdminProduct)


router.get("/adminApprove", adminApprove);
router.get("/adminApprove/updateStatus/:id", updateStatus);


router.get("/:userId/adminAproval", adminApproval);

router.get('/my-products/product/delete/:productId', deleteAdminProduct)

module.exports = router