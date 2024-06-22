const PORT=process.env.PORT||4000
const app=require('./app.js')
const connectDB =require('./DataBase/db.js')
// const authRouter=require('./router/auth.js')
// const DoDORouter=require('./router/Do-Do.js')
const ErrorMidleWare=require('./MiddleWare/error')
// const ErrorHandler = require('./utils/ErrorHandler.js')

connectDB()



const server=app.listen(PORT,(e)=>{
    console.log(`Server Running in Port :${PORT}  ${process.env.NODE_ENV}`);
})

process.on('unhandledRejection',(err)=>{
    console.log(`Error : ${err}`);
    console.log(`Shutting Down The Server unhandledRejection..`);
    server.close((err)=>{
        process.exit(1)
    })
})

process.on('uncaughtException',(err)=>{
    console.log(`Error : ${err}`);
    console.log(`Shutting Down The Server unhandledRejection..`);
    server.close((err)=>{
        process.exit(1)
    })
})
