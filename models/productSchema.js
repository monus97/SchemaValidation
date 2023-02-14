const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        max : 50,
        required : true
    },
    price : {
        type : Number,
        max : 2000,
        required : true
    },
    quantity : {
          type : Number,
          max : 3,
          required : true
    },
    productPic : {
    type : Array,
    },
    isActive : {
        type : Boolean,
        require : true
    },
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user"
    }
})
productSchema.set('timestamps',true)

module.exports = mongoose.model('product',productSchema)