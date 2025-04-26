const commentsRouter = require("express").Router();
const commentsController = require("../controllers/comments");

commentsRouter.post("/", commentsController.createComment);
commentsRouter.get("/", commentsController.getAllComments);
commentsRouter.get("/:commentid", commentsController.getComment);
commentsRouter.put("/:commentid", commentsController.updateComment);
commentsRouter.delete("/:commentid", commentsController.deleteComment);

module.exports = commentsRouter;
