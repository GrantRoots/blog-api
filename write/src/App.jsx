import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("http://localhost:3000/blogs", {
          mode: "cors",
        });
        if (!response.ok) return;
        const blogsData = await response.json();
        console.log(blogsData);
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
      <button>Create Blog</button>
      {/* Foreach blog have update, delete, and publish button */}
      {}
      {blogs.length < 1 ? (
        <div>No blogs yet create the first!</div>
      ) : (
        blogs.map((blog) => {
          <div>{blog.title}</div>;
        })
      )}
    </>
  );
}

export default App;
