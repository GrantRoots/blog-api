import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  async function handleLogin(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const resData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        navigate("/");
      } else {
        setError("Login failed please try again");
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" />

        <label htmlFor="password">Password: </label>
        <input type="password" name="password" />

        <button type="submit">Submit</button>
      </form>
      {error === null ? "" : <div>{error}</div>}
      <Link to={"/"}>Home</Link>
    </main>
  );
}

export { Login };
