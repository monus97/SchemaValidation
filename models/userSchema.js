const mongoose = require('mongoose')
// const uniqueValidator = require('mongoose-unique-validator')
// const validator = require('validator')
// const mongooseTypePhone = require('mongoose-type-phone')
const fs = require('fs')
const path = require('path')


const userSchema = new mongoose.Schema({

    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    phoneNumber:{
        type : Number,
        // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        required : true
       
    },
    email: {
        type: String,
     lowercase: true,
         unique: true, 
         required: [true, "can't be blank"],
         match: [/^([\w-]|(?<!\.)\.)+[a-zA-Z0-9]@[a-zA-Z0-9]([\w\-]+)((\.([c|o|m|i|n]){2,3})+)$/i, 'is invalid'],
         index: true,

        },
    password : {
        type : String,
        required : true
    },
    confirmPassword : {
        type : String,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    gender : {
        type : String,
        enum: ["male", "female","others"],
        required : true,
    },
    isActive : {
        type : Boolean,
        default : false
    },
    profilePic : {
        type : String ,
     
     },
    identity : {
         type : String
            }
})
userSchema.set('timestamps',true)

userSchema.path('phoneNumber').validate(function validatePhone() {
    return ( this.phoneNumber > 999999999 );
  });

module.exports = mongoose.model('user',userSchema)