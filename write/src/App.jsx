import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  const [blogs, setBlogs] = useState([]);
  const userId = parseInt(localStorage.getItem("userId"));
  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchBlogs() {
    try {
      const response = await fetch(`${API_URL}/blogs`, {
        mode: "cors",
      });
      if (!response.ok) return;
      const blogsData = await response.json();
      const userBlogs = blogsData.filter((blog) => blog.authorId === userId);
      setBlogs(userBlogs);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function deleteBlog(blogId) {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/blogs/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        await fetchBlogs();
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  async function handlePublish(blogId, published) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${API_URL}/blogs/${blogId}/publish?published=${published}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        await fetchBlogs();
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <main>
      <div>
        <Link to={"signup"}>Sign Up</Link>
        <Link to={"login"}>Log In</Link>
        <Link to={"blog"}>Create Blog</Link>
      </div>
      <h1>Write</h1>
      {blogs.length < 1 ? (
        <h2>No blogs yet create your first!</h2>
      ) : (
        blogs.map((blog) => (
          <div key={blog.id} className={styles.blog}>
            <h2>Title: {blog.title}</h2>
            <div>Text: {blog.text}</div>
            <div>Published: {blog.published ? "True" : "False"}</div>
            <Link to={`/update?blogId=${blog.id}`}>Update</Link>
            <button onClick={() => deleteBlog(blog.id)}>Delete</button>
            <button onClick={() => handlePublish(blog.id, blog.published)}>
              Publish
            </button>
          </div>
        ))
      )}
    </main>
  );
}

export default App;
