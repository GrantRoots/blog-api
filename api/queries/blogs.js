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

async function getAllBlogs() {
  try {
    return await prisma.blog.findMany();
  } catch (error) {
    throw error;
  }
}

async function getBlog(id) {
  try {
    return await prisma.blog.findUnique({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function updateBlog(id, title, text) {
  try {
    await prisma.blog.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        text: text,
      },
    });
  } catch (error) {
    throw error;
  }
}

async function deleteBlog(id) {
  try {
    await prisma.blog.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
