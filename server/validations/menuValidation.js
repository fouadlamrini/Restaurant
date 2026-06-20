const yup = require("yup");


const menuValidation = yup.object({

    name: yup
        .string()
        .required("Name is required")
        .min(3),


    price: yup
        .number()
        .required("Price is required")
        .min(0, "Price cannot be negative"),


    category: yup
        .string()
        .required("Category is required"),


    description: yup
        .string()
        .max(500, "Description too long")

});


module.exports = menuValidation;