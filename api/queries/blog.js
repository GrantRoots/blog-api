const prisma = require("../prisma");

async function createBlog(title, text) {
  try {
    await prisma.blog.create({
      data: {
        title: title,
        text: text,
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBlog,
};
