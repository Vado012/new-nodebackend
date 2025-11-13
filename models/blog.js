import mongoose from 'mongoose';
const blogschema = mongoose.Schema({
   
    title:{
        type:String,
        required:true
    },
      snippet:{
        type:String,
        required:true
    },
    image:{
      type: String,
      require: true
    },
      content:{
        type:String,
        required:true
    }
},{ timestamps:true })

const blog = mongoose.model('blog',blogschema);
export default blog;