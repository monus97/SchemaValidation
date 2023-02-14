const Product = require('../models/productSchema')
const path = require('path')


const createProduct = async(req,res)=>{
    try {

        const product = new Product(req.body);


        const filepath =req.files.map(({filename})=> `/uploads/${filename}`);
        // const filepath = `/uploads/${req.file.filename}`
    //  const filepath = req.file.filename
        product.productPic = filepath; 
        console.log("===>",filepath)
        const newProduct = await product.save()
        res.status(200).json({
            status : "success",
            message : "new product created successfull",
            newProduct : newProduct
        })
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}

const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const productUpdate = await Product.findByIdAndUpdate(id,req.body,{new : true})
        if(productUpdate){
          res.status(201).json({
            status : "success",
            message : "product updated successfull",
            product : productUpdate
          })
        }else{
            res.status(401).json({
                message : "product not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message : error.message
        })        
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const productdelete = await Product.findByIdAndDelete(id)
        if(productdelete){
            res.status(200).json({
                status : "success",
                message : "product deleted successfull"
            })
        }else{
            res.status(401).json({
                message : "product not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}

const readProduct = async(req,res)=>{
    try {
        const productRead = await Product.find({})
        if(productRead){
            res.status(200).json(productRead)
        }else{
            res.status(401).json({
                message : "product not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}
const getProductById = async(req,res)=>{
    try {
        const {id} = req.params;
        const viewProduct = await Product.findById(id,req.body,{title : 1})
        if(viewProduct){
            res.status(200).json({
                status : "success",
                productDetails : viewProduct
            })
        }else{
            res.status(400).json({
                status : "product not found"
            })
        }
    } catch (error) {
        res.status(404).json({
            message : error.message
        })
    }
}
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    readProduct,
    getProductById
}