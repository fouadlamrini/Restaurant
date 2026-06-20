const cloudinary = require("../config/cloudinary");
const fs = require("fs");


class CloudinaryService {


    async uploadImage(filePath){


        try{


            const result = await cloudinary.uploader.upload(

                filePath,

                {
                    folder:"restaurant-menu",
                    resource_type:"auto"
                }

            );



            fs.unlinkSync(filePath);



            return {

                url: result.secure_url,

                public_id: result.public_id

            };



        }catch(error){


            console.log(error);

            throw error;


        }


    }



    async deleteImage(public_id){

        return await cloudinary.uploader.destroy(public_id);

    }


}


module.exports = new CloudinaryService();