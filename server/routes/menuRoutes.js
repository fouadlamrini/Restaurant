const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const menuController = require("../controllers/menuController");



// CREATE
router.post(
    "/",
    upload.single("image"),
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
router.put(
    "/:id",
    upload.single("image"),
    menuController.updateMenu
);



// DELETE
router.delete(
    "/:id",
    menuController.deleteMenu
);



module.exports = router;