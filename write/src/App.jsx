import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [blogs, setBlogs] = useState(null);

  // Fetch blogs once the component mounts
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
      <button>Sign Up</button>
      <button>Log In</button>
      <button>Create Blog</button>
      <button>Foreach blog have update, delete, and publish button</button>
    </>
  );
}

export default App;
