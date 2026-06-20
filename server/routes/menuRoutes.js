const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");
const menuValidation = require("../validations/menuValidation");
const menuUpdateValidation = require("../validations/menuUpdateValidation");
const validate = require("../middleware/validate");
const menuController = require("../controllers/menuController");



// CREATE
router.post(
    "/",
    upload.single("image"),validate(menuValidation),
    menuController.createMenu
);



// READ ALL
router.get(
    "/",
    menuController.getMenus
);



// READ ONE
router.get(
    "/:id",
    menuController.getMenuById
);



// UPDATE
router.patch(
    "/:id",
    upload.single("image"),validate(menuUpdateValidation),
    menuController.updateMenu
);



// DELETE
router.delete(
    "/:id",
    menuController.deleteMenu
);



module.exports = router;