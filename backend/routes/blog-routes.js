import express from "express";
import { addNewBlog, deleteBlog, getAllBlogs, getBlogsByUserId, getById, updateBlog } from "../controllers/blog-controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getById);
blogRouter.post("/add-blog", addNewBlog);
blogRouter.put("/update-blog/:id", updateBlog);
blogRouter.delete("/delete-blog/:id", deleteBlog);
blogRouter.get("/user/:id", getBlogsByUserId);

export default blogRouter;