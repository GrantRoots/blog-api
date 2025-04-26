const { body, validationResult } = require("express-validator");
const db = require("../queries/queries");

const validateBlog = [body("title").trim().notEmpty()];

const createBlog = [
  validateBlog,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(400).render("signUp", {
        errors: errors.array(),
      });
    }
    try {
      await db.createBlog(req.body.title, req.body.text);
      res.status(201).json({ message: "Blog created" });
    } catch (error) {
      next(error);
    }
  },
];

module.exports = {
  createBlog,
};
