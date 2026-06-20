const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name is too long"]
    },


    description: {
        type: String,
        maxlength: [500, "Description too long"]
    },


    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price cannot be negative"]
    },


    category: {
        type: String,
        required: [true, "Category is required"]
    },


   image:{
    url:{
        type:String,
        default:null
    },

    public_id:{
        type:String,
        default:null
    }
}

},
{
    timestamps: true
}
);


module.exports = mongoose.model("Menu", menuSchema);