const PORT=process.env.PORT||4000
const app=require('./app.js')
const connectDB =require('./DataBase/db.js')
const authRouter=require('./router/auth.js')
const DoDORouter=require('./router/Do-Do.js')
connectDB()

app.use('/server',authRouter)
app.use('/server',DoDORouter)


app.listen(PORT,(e)=>{
    console.log(`Server Running in Port :${PORT}  ${process.env.NODE_ENV}`);
})
