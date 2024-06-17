const mongoose=require('mongoose')
// const validator_mongoose=require('mongoose-unique-validator')

const Dodo_Schema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true]
    },
    Data:{
        title:{
            required:[true],
            type:String,
        },
        subject:{
            required:[true],
            type:String,
        }
    },
    isModified:{
        type:Date
    },
    cretaAt:{
        type:Date,
        default:Date.now()
    }
    
})

const Dodo_Model=mongoose.model('Dodo-model',Dodo_Schema);

module.exports=Dodo_Model