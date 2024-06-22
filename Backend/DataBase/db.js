const mongoose=require('mongoose')
const dotenv=require('dotenv')
const path=require('path')

dotenv.config({path:path.join(__dirname,'../config/Do-Do.env')})
const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL, {useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true })
        console.log(`MongoDB connected IN ${process.env.MONGO_URL}`);
    } catch (error) {
        console.log(`MongoDB NOt connected ,,  Error : ${error}`);
    }

}
module.exports=connectDB
