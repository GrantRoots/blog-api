const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../queries/queries");
const passport = require("passport");

const validateUser = [
  body("username").trim().notEmpty().escape(),
  body("password").trim().notEmpty(),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      throw new Error("Passwords do not match");
    }),
  body("firstName").trim().notEmpty().isAlpha().escape(),
  body("lastName").trim().notEmpty().isAlpha().escape(),
];

const signUp = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(errors);
      return res.status(400).render("signUp", {
        errors: errors.array(),
      });
    }
    try {
      await db.signUp(
        req.body.username,
        await bcrypt.hash(req.body.password, 10),
        req.body.firstName,
        req.body.lastName,
        req.body.author
      );
      res.status(201).json({ message: "User signed up successfully" });
    } catch (error) {
      next(error);
    }
  },
];

function logIn(req, res) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })(req, res, next);
}

module.exports = {
  signUp,
  logIn,
};
