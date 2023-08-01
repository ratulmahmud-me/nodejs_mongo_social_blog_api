import mongoose from "mongoose";
import Blog from "../models/Blog";
import User from "../models/User";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        return console.log(error);
    }
    if (!blogs) {
        return res.status(404).json({ message: "No Blogs Found" });
    }
    return res.status(200).json({ blogs });
}

export const addNewBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body; // user = current user id

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    }
    if (!existingUser) {
        return res.status(403).json({ message: "Unable To Authorize Current User!" });
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try {
        // adding mongodb session to get current execution _id after insert query done 
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session });
        await session.commitTransaction();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error });
    }

    return res.status(200).json({ blog });
}

export const updateBlog = async (req, res, next) => {
    const { title, description, image } = req.body;
    const blogId = req.params.id
    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
            image
        });
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(500).json({ message: "Unable To Update The Blog!" });
    }

    return res.status(200).json({ blog });
}

export const getById = async (req, res, next) => {
    const blogId = req.params.id
    let blog;

    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: "No Blog Found" });
    }

    return res.status(200).json({ blog });
}

export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id
    let blog;

    try {
        blog = await Blog.findByIdAndRemove(blogId).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable To Delete!" });
    }

    return res.status(200).json({ message: "Successfully Deleted.", blog: blog });
}

export const getBlogsByUserId = async (req, res, next) => {
    const userId = req.params.id;
    let userBlogs;

    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } catch (error) {
        return console.log(error);
    }

    if (!userBlogs) {
        return res.status(404).json({ message: "No Blogs Found!" });
    }
    return res.status(200).json({ blogs: userBlogs });
}