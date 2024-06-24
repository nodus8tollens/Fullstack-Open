import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (user) {
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } else {
      setBlogs([]);
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  const authorChange = (event) => {
    setAuthor(event.target.value);
  };

  const urlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    setBlogs([]);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = { title, author, url };
      console.log("Creating blog with", newBlog);
      const result = await blogService.create(newBlog);
      setBlogs(blogs.concat(result));
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.error("Error creating blog: ", error);
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
          <h2>Blogs</h2>
          <p>{user.name} has logged-in</p>
          <button onClick={handleLogout}>Log Out</button>
          <NewBlog
            handleCreateBlog={handleCreateBlog}
            title={title}
            titleChange={titleChange}
            author={author}
            authorChange={authorChange}
            url={url}
            urlChange={urlChange}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
