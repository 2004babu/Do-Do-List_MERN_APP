const express=require('express')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const path=require('path')
const cookieParser=require('cookie-parser')
const ErrorMidleWare=require('./MiddleWare/error')
const app=express()
dotenv.config({path:path.join(__dirname,'config','Do-Do.env')})

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(ErrorMidleWare)
module.exports=app