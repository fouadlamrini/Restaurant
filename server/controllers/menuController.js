const menuService = require("../services/menuService");
const cloudinaryService = require("../services/cloudinaryService");

class MenuController {

    // إنشاء قائمة طعام جديدة مع رفع صورة
    async createMenu(req, res) {
        try {
            let image = null;

            if (req.file) {
                // رفع الصورة إلى Cloudinary
                image = await cloudinaryService.uploadImage(req.file.path);
            }

            const menu = await menuService.createMenu({
                ...req.body,
                image
            });

            res.status(201).json({
                success: true,
                message: "Menu created successfully",
                data: menu
            });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // جلب جميع القوائم
    async getMenus(req, res) {
        try {
            const menus = await menuService.getMenus();
            res.json({
                success: true,
                data: menus
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // جلب قائمة واحدة بواسطة الـ ID
    async getMenuById(req, res) {
        try {
            const menu = await menuService.getMenuById(req.params.id);
            if (!menu) {
                return res.status(404).json({
                    success: false,
                    message: "Menu not found"
                });
            }
            res.json({
                success: true,
                data: menu
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // تحديث قائمة طعام (مع التعامل مع تغيير الصورة)
    async updateMenu(req, res) {
        try {
            const updateData = { ...req.body };

            if (req.file) {
                const oldMenu = await menuService.getMenuById(req.params.id);

                // حذف الصورة القديمة من Cloudinary إذا كانت موجودة
                if (oldMenu?.image?.public_id) {
                    await cloudinaryService.deleteImage(oldMenu.image.public_id);
                }

                // رفع الصورة الجديدة
                updateData.image = await cloudinaryService.uploadImage(req.file.path);
            }

            const menu = await menuService.updateMenu(req.params.id, updateData);

            if (!menu) {
                return res.status(404).json({
                    success: false,
                    message: "Menu not found"
                });
            }

            res.json({
                success: true,
                message: "Menu updated successfully",
                data: menu
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }

    // حذف قائمة طعام
    async deleteMenu(req, res) {
        try {
            const menu = await menuService.getMenuById(req.params.id);
            if (!menu) {
                return res.status(404).json({
                    success: false,
                    message: "Menu not found"
                });
            }

            // حذف الصورة من Cloudinary قبل حذف القائمة من الداتابايز
            if (menu.image?.public_id) {
                await cloudinaryService.deleteImage(menu.image.public_id);
            }

            await menuService.deleteMenu(req.params.id);

            res.json({
                success: true,
                message: "Menu deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
}

module.exports = new MenuController();