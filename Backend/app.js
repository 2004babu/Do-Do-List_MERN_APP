const express=require('express')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const path=require('path')
const cookieParser=require('cookie-parser')
const ErrorMidleWare=require('./MiddleWare/error')
const auth=require('./router/auth')
const dodo=require('./router/Do-Do')
const app=express()
const cors = require('cors');
dotenv.config({path:path.join(__dirname,'config','Do-Do.env')})

app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // frontend URL
    credentials: true
}));


   
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('/',(req,res)=>{
        res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
    })

app.use('/api/server',auth)
app.use('/api/server',dodo)
app.use(ErrorMidleWare)
module.exports=app
