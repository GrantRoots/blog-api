import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateBlog() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleCreateBlog(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", resData.token);
        navigate("/");
      } else {
        setError("Login failed please try again");
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <>
      <form onSubmit={handleCreateBlog}>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" />
        <label htmlFor="text">Text:</label>
        <input type="text" name="text" />
      </form>
    </>
  );
}

export { CreateBlog };
