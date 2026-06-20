const Menu = require("../models/Menu");


class MenuService {


    async createMenu(data){

        return await Menu.create(data);

    }



    async getMenus(){

        return await Menu.find();

    }



    async getMenuById(id){

        return await Menu.findById(id);

    }



    async updateMenu(id, data){

        return await Menu.findByIdAndUpdate(

            id,

            data,

            {
                new:true
            }

        );

    }



    async deleteMenu(id){

        return await Menu.findByIdAndDelete(id);

    }


}


module.exports = new MenuService();