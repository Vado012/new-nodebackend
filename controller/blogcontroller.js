

import Blog from "../models/blog.js"

const createblog = async(req,res)=>{
    try {
        let {title, snippet, content} = req.body
        if (!title || !snippet || !content) {
            return res.status(400).json({message: "All fields are required man"})
        }

        let imageUrl = req.file.path

        let newBlog= await Blog.create({
            title,
            snippet,
            image: imageUrl,
            content
        })
        res.status(201).json({message: "blog created successfully!"})
    } catch (error) {
        res.status(500).json({message: "Internal server Error"})
        console.log(error)
    }
}

const getAllblog = async(req,res)=>{
    try {
        let blog = await Blog.find();
        if (blog.length === 0) {
            return res.status(404).json({message: "No users found"});

        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.log(error);
    }
}

const deleteblog = async(req,res)=>{
    try {
        let {id} = req.params;
        let blog = await Blog.findByIdAndDelete(id);
        if (!blog) {
            return res.status(404).json({message: "User not found"});

        }
        res.status(200).json({message: "User deleted successfully!"});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.log(error);
    }
}

const updateblog = async(req,res)=>{
    try {
        let {id} = req.params;
        let blog = await Blog.findByIdAndUpdate(id,req.body,{new:true});
        if (!blog) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User updated successfully!", blog});
    } catch (error) {
        res.status(500).json({message: "Internal server error"});
        console.log(error);
    }
}

export {createblog, getAllblog, deleteblog, updateblog};