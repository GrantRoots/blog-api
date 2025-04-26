const blogsRouter = require("express").Router();
const blogsController = require("../controllers/blogs");

blogsRouter.post("/", blogsController.createBlog);
blogsRouter.get("/", blogsController.getAllBlogs);
blogsRouter.get("/:blogid", blogsController.getBlog);
blogsRouter.put("/:blogid", blogsController.updateBlog);

module.exports = blogsRouter;
