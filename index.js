require('dotenv').config();
require('./models/config')
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = require('./router/commonRouter')
require('cookie-parse');
const pdfread = require('pdf-parse')

app.use(bodyParser.json())
app.use(express.json())
app.use('/',router)

app.listen(process.env.PORT,(req,res)=>{
    console.log(`this server is running on port no : ${process.env.PORT}`)
})