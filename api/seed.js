const prisma = require("./prisma");
const bcrypt = require("bcryptjs");

async function createBlog(title, text, authorId) {
  const existingBlog = await prisma.blog.findFirst({
    where: { title, text, authorId },
  });

  if (existingBlog) {
    await prisma.blog.update({
      where: { id: existingBlog.id },
      data: { title, text, published: true },
    });
  } else {
    await prisma.blog.create({
      data: { title, text, authorId, published: true },
    });
  }
}

async function createComment(text, authorId, blogId) {
  const existingBlog = await prisma.comment.findFirst({
    where: { text, authorId, blogId },
  });

  if (existingBlog) {
    await prisma.comment.update({
      where: { id: existingBlog.id },
      data: { text },
    });
  } else {
    await prisma.comment.create({
      data: { text, authorId, blogId },
    });
  }
}

async function seedUserAndBlog() {
  const users = [
    {
      username: "GrantRoots",
      password: await bcrypt.hash("password", 10),
      firstName: "Grant",
      lastName: "Roots",
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }

  await createBlog(
    "Hello World!",
    "Welcome to my blogging app. This is the first blog ever!",
    1
  );
  await createBlog(
    "Try it out!",
    "Leave a comment or write a short blog if you'd like :)",
    1
  );

  await createComment("Hello this is a comment!", 1, 1);
  await createComment("Hello this is my second comment!", 1, 2);
}

seedUserAndBlog();
