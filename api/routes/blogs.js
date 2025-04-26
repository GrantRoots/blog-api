const blogsRouter = require("express").Router();
const blogsController = require("../controllers/blogs");
const commentsRouter = require("./comments");

blogsRouter.post("/", blogsController.createBlog);
blogsRouter.get("/", blogsController.getAllBlogs);
blogsRouter.get("/:blogid", blogsController.getBlog);
blogsRouter.put("/:blogid", blogsController.updateBlog);
blogsRouter.delete("/:blogid", blogsController.deleteBlog);

blogsRouter.use("/:blogid/comments", commentsRouter);

module.exports = blogsRouter;
