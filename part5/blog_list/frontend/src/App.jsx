import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      {user === null ? (
        <Login
          username={username}
          password={password}
          usernameChange={usernameChange}
          passwordChange={passwordChange}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in</p>

          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
