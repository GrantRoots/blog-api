import App from "./App";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { CreateComment } from "./components/CreateComment";

const routes = [
  {
    path: "/",
    element: <App />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "create",
    element: <CreateComment />,
  },
];

export default routes;
