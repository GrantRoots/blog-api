import "./App.css";

async function App() {
  try {
    const response = await fetch("http://localhost:3000/blogs", {
      mode: "cors",
    });
    const blogs = response.json();
    console.log(blogs);
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <button>Sign Up</button>
      <button>Log In</button>
      <button>Create Blog</button>
      <button>Foreach blog have update, delete, and publish button</button>
      await
    </>
  );
}

export default App;
