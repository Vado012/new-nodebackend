import mongoose from 'mongoose';
const userschema = mongoose.Schema({
    Firstname:{
        type:String,
        required:true
    },
    Lastname:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:String,
        required:true
    },
    role:{
        type:String, 
        enum: ["admin", "user"],
        default:"user"
    }
},{ timestamps:true })

const user = mongoose.model('user',userschema);
export default user;