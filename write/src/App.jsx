import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("http://localhost:3000/blogs", {
          mode: "cors",
        });
        if (!response.ok) return;
        const blogsData = await response.json();
        setBlogs(blogsData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBlogs();
  }, []);

  return (
    <>
      <Link to={"signup"}>
        <button>Sign Up</button>
      </Link>
      <Link to={"login"}>
        <button>Log In</button>
      </Link>
      <Link to={"blog"}>
        <button>Create Blog</button>
      </Link>
      {blogs.length < 1 ? (
        <div>No blogs yet create the first!</div>
      ) : (
        blogs
          .filter((blog) => blog.authorId === userId)
          .map((blog) => (
            <h4 key={blog.id}>
              <div>{blog.title}</div>
              <div>{blog.text}</div>
              <div>Published: {blog.published ? "True" : "False"}</div>
              {/* Link to update with blogId as param */}
              <Link to={`/update?blogId=${blog.id}`}>
                <button>Update</button>
              </Link>
              <button>Delete</button>
              <button>Publish</button>
            </h4>
          ))
      )}
    </>
  );
}

export default App;
