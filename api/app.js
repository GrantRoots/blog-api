const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
//will have to change the output in prisma schema and this line to import from the /prisma/generated/client file
const { PrismaClient } = require("@prisma/client");
const prisma = require("./prisma");
const cors = require("cors");

const userRouter = require("./routes/user");
const blogsRouter = require("./routes/blogs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { id: jwt_payload.sub },
      });

      if (user) return done(null, user);
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: "a santa at nasa",
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/blogs", blogsRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send(err.message);
});

app.listen(PORT);
