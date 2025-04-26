const blogRouter = require("express").Router();
const blogController = require("../controllers/blog");

blogRouter.post("/", blogController.createBlog);

module.exports = blogRouter;
