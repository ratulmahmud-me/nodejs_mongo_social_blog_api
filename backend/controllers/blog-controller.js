import Blog from "../models/Blog";

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
    const { title, description, image, user } = req.body;

    const blog = new Blog({
        title,
        description,
        image,
        user
    });

    try {
        await blog.save();
    } catch (error) {
        return console.log(error);
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
        blog = await Blog.findByIdAndRemove(blogId);
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        return res.status(404).json({ message: "Unable To Delete!" });
    }

    return res.status(200).json({ message: "Successfully Deleted." });
}