import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useNotification } from "./context/NotificationContext";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const { state: notification, dispatch } = useNotification();

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

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Login successful", error: false },
      });
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    } catch (error) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: `Error logging in: ${error}`, error: true },
      });
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    }
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogUser");
      setUser(null);
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Logged out successfully", error: false },
      });
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    } catch (error) {
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: `Error logging out: ${error}`,
          error: true,
        },
      });
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    }
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAllBlogs,
  });

  if (user === null) {
    return (
      <Login
        username={username}
        password={password}
        usernameChange={usernameChange}
        passwordChange={passwordChange}
        handleLogin={handleLogin}
      />
    );
  }

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>blog service not available due to problem in server</div>;
  }

  const blogs = result.data.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      {notification.message !== "" && (
        <Notification notification={notification} />
      )}
      <div>
        <h2>Blogs</h2>
        <p>{user.name} has logged in</p>
        <button data-testid="logout-button" onClick={handleLogout}>
          Log Out
        </button>
        <Togglable buttonLabel={{ show: "New Note", hide: "Cancel" }}>
          <NewBlog />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
      </div>
    </div>
  );
};

export default App;
