import express from "express";
import { addNewBlog, getAllBlogs, getById, updateBlog } from "../controllers/blog-controller";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.get("/:id", getById);
blogRouter.post("/add-blog", addNewBlog);
blogRouter.put("/update-blog/:id", updateBlog);

export default blogRouter;