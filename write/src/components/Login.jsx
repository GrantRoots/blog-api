import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <form action="http://localhost:3000/user/login" method="post">
        <label htmlFor="username">Username: </label>
        <input type="text" name="username" />
        <label htmlFor="password">Password: </label>
        <input type="text" name="password" />
        <button type="submit">Submit</button>
      </form>
      <Link to={"/"}>
        <button>Home</button>
      </Link>
    </>
  );
}

export { Login };
