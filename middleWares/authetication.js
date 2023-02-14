const user = require('../models/userSchema');
const jwt = require("jsonwebtoken")
const config = process.env;


// const verifyToken = (req, res, next) => {
//   const token =
//   req.body.token || req.query.token || req.headers["x-access-token"];
  
//   if (!token) {
//     return res.status(403).send("A token is required for authentication");
//   }
//   try {
//     const user = jwt.verify(token, config.JWT_SECRET_KEY);
//     req.userId = user.id

//   } catch (err) {
//     return res.status(401).send("Invalid Token");
//   }
//   return next();
// };


const verifyToken = async(req,res,next)=>{
     let token;
       const {authorization} = req.headers; 
       if(authorization && authorization.startsWith("bearer")){
           try {
            token = authorization.split(" ")[1]; 
           const {userid} = jwt.verify(token, config.JWT_SECRET_KEY);
            req.user = await user.findById(userid).select('-password')
            next();
         } catch (err) {
             res.status(401).send({
                 message : "unauthorized user"});
             }
           }if(!token){
               res.status(404).send({
                   message : "invalid token"
                  })
                }
              }
              
              module.exports = {verifyToken}








// //               const verifyToken = (req, res, next) => {
// //                   try {
// //                       const token = req.header("x-auth-token");
// //                       if (!token) return res.status(403).send("Access denied.");
                  
// //                       const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
// //                       req.User = decoded;
// //                       next();
// // } catch (error) {
// //     res.status(400).send("Invalid token");
// // }
// // };
