import e from 'express';
import { config } from 'dotenv';
import mongoose, { get } from 'mongoose';
import { createuser, getAllUsers, deleteUser, updateUser, login } from './controller/usercontroller.js';
import { createcomment, getAllComment, deleteComment, updateComment } from './controller/commentController.js';
import { createblog, getAllblog, deleteblog, updateblog } from './controller/blogcontroller.js';
import user from './models/user.js';
import userRoutes from './Routes/userRoutes.js';
import commentRoutes from './Routes/commentRoutes.js';
import blogRoutes from './Routes/blogRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

config()
const app = e();
const port = process.env.PORT || 4000 ;

app.use(e.json());
app.use(e.urlencoded({extended:true}));
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:5173',
   
}));

mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log(err));


app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.use('/api/user', userRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/blog', blogRoutes)
  


app.listen(port,()=>{
    console.log(`Server is running at port ${port}`); 
})