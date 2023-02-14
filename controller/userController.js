const User = require('../models/userSchema')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const securePassword = require('../hash/passwordhashing');
const path = require('path')


const userRegister = async(req,res)=>{
    try {
        const newUser =   new User(req.body);
        console.log(newUser)
        const cheakUser = await  User.findOne({ email : req.body.email})
        if(!cheakUser){
            //   const filepath = `/uploads/${req.file.filename}`; 
            // //   const file = `/uploads/${req.file.file}`; 
            // newUser.profilePic = filepath; 
            // // newUser.identity = file;
            // newUser.identity = filepath; 
           
        if(newUser.password === newUser.confirmPassword){
            const password = (newUser.password === newUser.confirmPassword)
            const salt = await bcrypt.genSalt(10)
            newUser.password = await bcrypt.hash(newUser.password,salt) 
             newUser.confirmPassword = await bcrypt.hash(newUser.confirmPassword,salt)
             const user = await newUser.save()
             res.status(200).json({
                 status : "success",
                 message : "new user registerd successfull",
                 user : user
                })
            }else{
                res.status(400).json({
                    message : "password does not match"
                })
            }
    }else{
        return res.status(401).json({
            message : "user already exits please login"
        })
    }
    } catch (error) {
        res.status(404).json({
            status : "failed",
            message : error.message
        })
    }
}


const userLogin = async(req,res)=>{
    try {
        const {email,password} = req.body;
        if(email && password){
            const oldUser = await User.findOne({email : email})
            if(oldUser != null){
                const isMatch = await bcrypt.compare(password,oldUser.password)
                if(oldUser.email === email && isMatch){
                    if(oldUser.isActive === false){
                        return res.status(401).send({
                            message : "you are not active user"
                        })}
                    
                    const token =  jwt.sign({userID : oldUser._id},
                        process.env.JWT_SECRET_KEY,{expiresIn: "2h"})
                    res.status(200).json({
                        status : "success",
                        message : "login successfull",
                        user : oldUser,
                        token : token
                    })
                }else{
                    res.status(401).json({
                        message : "wrong password"
                    })
                }
            }else{
                res.status(404).json({
                    message : "please enter a valid email"
                })
            }
        
    }else{
        res.status.json({
            message : "please enter your email and passsword",
            
        })
    }   
    } catch (error) {
        res.status(401).json({
            message : error.message
        })
    }
}

const userUpdateHisProfile = async(req,res)=>{
    try {
        const {id} = req.params;
        const userdetail = await User.find({_id:req.User_id})

        const userProfile = await User.findByIdAndUpdate(id,req.body,{new : true})
        if(userProfile){
            res.status(200).json({
                status : "success",
                updatedProfile : userProfile
            })
        }else{
            res.status(401).json({
                status : "user not found"
            })
        }
    } catch (error) {
        res.status(404).json({
        message : error.message
        })
    }
}

const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const findUser = await User.findByIdAndDelete(id)
        if(findUser){
            res.status(200).json({
                status : "user deleted "
            })
        }else{
            res.status(401).json({
                status : "user not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}

const UserDetail = async(req,res)=>{
    try {
    //   const {id} = req.params;
    const details = await User.find({isActive : false})

        if(details){
           
            res.status(200).json({
                status : "success",
                userProfile : details 
            })
        }else{
            res.status(404).json({
                status : "failed",
                message : "user not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}
module.exports = {
    userRegister,
    userLogin,
    userUpdateHisProfile,
    deleteUser,
    UserDetail
}





 