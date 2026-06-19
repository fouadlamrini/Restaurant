const Menu = require("../models/Menu");

class MenuController {


    async createMenu(req, res) {

        try {

            const menu = await Menu.create({

                ...req.body,

                image: req.file ? req.file.filename : null

            });


            res.status(201).json({

                success:true,
                message:"Menu created successfully",
                data:menu

            });


        } catch (error) {

            res.status(500).json({

                success:false,
                message:error.message

            });

        }

    }




    async getMenus(req, res) {

        try {

            const menus = await Menu.find();


            res.json({

                success:true,
                message:"Menus fetched successfully",
                data:menus

            });


        } catch (error) {

            res.status(500).json({

                success:false,
                message:error.message

            });

        }

    }





    async getMenuById(req, res) {

        try {

            const menu = await Menu.findById(req.params.id);


            if(!menu){

                return res.status(404).json({

                    success:false,
                    message:"Menu not found"

                });

            }


            res.json({

                success:true,
                data:menu

            });


        } catch (error) {

            res.status(500).json({

                success:false,
                message:error.message

            });

        }

    }





    async updateMenu(req, res) {

        try {


            const updateData = {
                ...req.body
            };


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

                    success:false,
                    message:"Menu not found"

                });

            }



            res.json({

                success:true,
                message:"Menu updated successfully",
                data:menu

            });



        } catch (error) {

            res.status(500).json({

                success:false,
                message:error.message

            });

        }

    }





    async deleteMenu(req, res) {

        try {


            const menu = await Menu.findByIdAndDelete(req.params.id);



            if(!menu){

                return res.status(404).json({

                    success:false,
                    message:"Menu not found"

                });

            }



            res.json({

                success:true,
                message:"Menu deleted successfully"

            });



        } catch (error) {

            res.status(500).json({

                success:false,
                message:error.message

            });

        }

    }


}


module.exports = new MenuController();