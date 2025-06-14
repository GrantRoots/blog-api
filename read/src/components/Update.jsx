import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Update() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const commentId = searchParams.get("commentid");
  const API_URL = import.meta.env.VITE_API_URL;

  async function handleUpdate(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/blogs/0/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        navigate("/");
      } else {
        setError("Update failed please try again");
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }
  return (
    <main>
      <h1>Update</h1>
      <form onSubmit={handleUpdate}>
        <label htmlFor="text">Text:</label>
        <input type="text" name="text" />
        <button type="submit">Submit</button>
      </form>
      <Link to={"/"}>Home</Link>
    </main>
  );
}

export { Update };
