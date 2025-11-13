
import Comment from "../models/comment.js";
import Blog from "../models/blog.js";

const createcomment = async(req,res)=>{
    try {
        let {comment} = req.body
        let {blogId} = req.params;

        let checkPost = await Blog.findById(blogId);
        if (!checkPost) {
            return res.status(404).json({message: "Blog not found"});
        }

        if (!comment) {
            return res.status(400).json({message: "All fields are required"})
        }

        let newcomment = await Comment.create({
            comment,
            blogId
        })
        res.status(201).json({message: "comment created successfully!"})
    } catch (error) {
        res.status(500).json({message: "Internal server Error"})
        console.log(error)
    }
}

const getAllComment = async(req,res)=>{
    try {
        let comment = await Comment.find();
        if (comment.length === 0) {
            return res.status(404).json({message: "No users found"});

        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.log(error);
    }
}

const deleteComment = async(req,res)=>{
    try {
        let {id} = req.params;
        let comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            return res.status(404).json({message: "User not found"});

        }
        res.status(200).json({message: "User deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.log(error);
    }
}

const updateComment = async(req,res)=>{
    try {
        let {id} = req.params;
        let comment = await Comment.findByIdAndUpdate(id,req.body,{new:true});
        if (!comment) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User updated successfully!", comment});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.log(error);
    }
}

export {createcomment, getAllComment, deleteComment, updateComment};