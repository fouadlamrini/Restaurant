const Menu = require("../models/Menu");

class MenuController {


    async createMenu(req, res) {

        try {

            const menu = await Menu.create({

                ...req.body,

                image: req.file ? req.file.filename : null

            });


            res.status(201).json(menu);


        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }




    async getMenus(req, res) {

        try {

            const menus = await Menu.find();

            res.json(menus);


        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }





    async getMenuById(req, res) {

        try {

            const menu = await Menu.findById(req.params.id);


            if(!menu){

                return res.status(404).json({
                    message:"Menu not found"
                });

            }


            res.json(menu);


        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }





    async updateMenu(req, res) {

        try {


            const updateData = {
                ...req.body
            };


            // ila user upload image jdida
            if(req.file){

                updateData.image = req.file.filename;

            }



            const menu = await Menu.findByIdAndUpdate(

                req.params.id,

                updateData,

                {
                    new:true
                }

            );


            if(!menu){

                return res.status(404).json({
                    message:"Menu not found"
                });

            }



            res.json(menu);



        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }






    async deleteMenu(req, res) {

        try {


            const menu = await Menu.findByIdAndDelete(req.params.id);


            if(!menu){

                return res.status(404).json({
                    message:"Menu not found"
                });

            }


            res.json({

                message:"Menu deleted"

            });


        } catch (error) {

            res.status(500).json({
                message: error.message
            });

        }

    }

}


module.exports = new MenuController();