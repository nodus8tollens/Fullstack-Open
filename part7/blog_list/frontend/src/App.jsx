import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");

  //Whenever the component mounts or one of its dependencies change (e.g. [user]),
  //the useEffect hook will execute its callback function (e.g. blogService.getAllBlogs())
  useEffect(() => {
    if (user) {
      blogService.getAllBlogs().then((blogs) => {
        blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(blogs);
      });
    } else {
      setBlogs([]);
    }
  }, [user]);
  //Since no dependencies are specified ( [] ), the useEffect hook will execute only upon mounting the component.
  //In this case, the hook checks for a logged user in the browsers local storage and sets a token
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);
  //This, and similar functions, which can be written shorthand and inline, are used to set and control
  //values of the components forms.
  const usernameChange = (event) => {
    setUsername(event.target.value);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };
  //A handler function passed to the Login component that executes login, local storage, Login component state,
  //and Notification component state functionalities
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({ message: "Login successful", error: false });
      setTimeout(() => {
        setNotification("");
      }, 5000);
    } catch (error) {
      setNotification({ message: `Error logging in: ${error}`, error: true });
      setTimeout(() => {
        setNotification("");
      }, 5000);
    }
  };
  //A handler function passed to the Log Out button that removes user data from local storage
  //and handles the states of dependant components.
  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogUser");
    setUser(null);
    setBlogs([]);
    setNotification({ message: "Logged out successfully", error: false });
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };
  //A handler function used for adding new blogs via the blogService module, and the Blog component state (via setBlogs)
  const addBlog = async (newBlog) => {
    const result = await blogService.createBlog({ ...newBlog, user: user });
    result.user = {
      username: user.username,
      name: user.name,
      id: user.id,
    };

    setBlogs(blogs.concat(result));
  };
  // A handler function for increasing the like count on individual blog posts. It PUT's an updated blog
  // while also updating the frontend blog state with the response object (via setBlogs)
  const increaseLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user ? blog.user.id : null,
    };
    try {
      const returnedBlog = await blogService.updateBlog(blog.id, updatedBlog);
      returnedBlog.user = blog.user;
      setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  return (
    <div>
      {/*If the notification state is not null, the Notification component will render with the states' content */}
      {notification && <Notification notification={notification} />}
      {/*If there is no user, the Login component will render, else the user's blogs and its accompanying components will render */}
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
          <p>{user.name} has logged in</p>
          <button data-testid="logout-button" onClick={handleLogout}>
            Log Out
          </button>
          <Togglable buttonLabel={{ show: "New Note", hide: "Cancel" }}>
            {" "}
            <NewBlog addBlog={addBlog} setNotification={setNotification} />
          </Togglable>
          {/*We use Array.map to dynamically render the blogs*/}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              increaseLike={increaseLike}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
