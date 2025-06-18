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
      setBlogs(blogsData);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []);

  async function handleDelete(commentId) {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/blogs/0/comments/${commentId}`, {
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

  return (
    <main>
      <div>
        <Link to={"signup"}>Sign Up</Link>
        <Link to={"login"}>Log In</Link>
      </div>
      <h1>Read</h1>
      {console.log(blogs)}
      {blogs.length < 1 ? (
        <div>No blogs yet create the first!</div>
      ) : (
        blogs
          .filter((blog) => blog.published === true)
          .map((blog) => (
            <div key={blog.id} className={styles.blog}>
              <div>Blog #{blog.id}</div>
              <h2>{blog.title}</h2>
              <p>{blog.text}</p>
              <div>
                <h3>Comments:</h3>
                <div>
                  {blog.comments.length < 1 ? (
                    <div>Write the first!</div>
                  ) : null}
                  {blog.comments.map((comment) => (
                    <div key={comment.id} className={styles.comment}>
                      <div>{comment.text}</div>
                      {comment.authorId === userId && (
                        <>
                          <Link to={`/update?commentid=${comment.id}`}>
                            Update
                          </Link>
                          <button onClick={() => handleDelete(comment.id)}>
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <Link to={`/create?blogid=${blog.id}`}>Add a comment</Link>
            </div>
          ))
      )}
    </main>
  );
}

export default App;
