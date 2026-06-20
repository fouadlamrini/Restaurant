const yup = require("yup");


const menuUpdateValidation = yup.object({

    name: yup
        .string()
        .min(3, "Name too short"),


    price: yup
        .number()
        .typeError("Price must be a number")
        .min(0),


    category: yup.string(),


    description: yup.string()

});


module.exports = menuUpdateValidation;