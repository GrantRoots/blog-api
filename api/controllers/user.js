const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const db = require("../queries/queries");
const passport = require("passport");
const jwt = require("jsonwebtoken");

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

function logIn(req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    jwt.sign(
      { sub: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "168h" },
      (err, token) => {
        if (err) {
          return next(err);
        }
        res.json({ token });
      }
    );
  })(req, res, next);
}

module.exports = {
  signUp,
  logIn,
};
