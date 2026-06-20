const multer = require("multer");
const fs = require("fs");
const uploadDir = "public/uploads";


if(!fs.existsSync(uploadDir)){

    fs.mkdirSync(uploadDir, {
        recursive:true
    });

}

const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,uploadDir);

    },


    filename:(req,file,cb)=>{

        cb(
            null,
            Date.now() + "-" + file.originalname
        );

    }

});



const fileFilter = (req,file,cb)=>{


    const allowedTypes = [

        "image/jpeg",
        "image/png",
        "image/webp"

    ];



    if(allowedTypes.includes(file.mimetype)){

        cb(null,true);

    }else{

        cb(
            new Error("Only images are allowed"),
            false
        );

    }

};



const upload = multer({

    storage,

    fileFilter,


    limits:{

        fileSize:5 * 1024 * 1024

    }

});


module.exports = upload;