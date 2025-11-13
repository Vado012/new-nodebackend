import mongoose from 'mongoose';
const commentschema = mongoose.Schema({
   
    comment:{
        type:String,
        required:true
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        required: true
    }
},{ timestamps:true })

const comment = mongoose.model('comment',commentschema);
export default comment;