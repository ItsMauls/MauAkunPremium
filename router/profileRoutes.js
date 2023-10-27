const { adminApprove, updateStatus, profile, formProfiles, postProfiles, listCart, adminAproval, addCart } = require("../controllers/main");
const router = require('express').Router()

router.get("/:userId/profile", profile);

router.get("/:userId/profile/edit", formProfiles);
router.post("/:userId/profile/edit", postProfiles);

module.exports = router