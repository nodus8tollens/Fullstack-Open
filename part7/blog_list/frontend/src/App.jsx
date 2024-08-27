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

  //A handler function passed to the Log Out button that removes user data from local storage
  //and handles the states of dependant components.
  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogUser");
      setUser(null);
      setBlogs([]);
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
      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: `Error liking blog: ${error}`, error: true },
      });
      setTimeout(() => {
        dispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    }
  };

  const deleteBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      try {
        await blogService.deleteBlog(blog.id);
        setBlogs(blogs.filter((b) => b.id !== blog.id));
        dispatch({
          type: "SHOW_NOTIFICATION",
          payload: { message: "Deleted blog", error: false },
        });
        setTimeout(() => {
          dispatch({ type: "HIDE_NOTIFICATION" });
        }, 5000);
      } catch (error) {
        dispatch({
          type: "SHOW_NOTIFICATION",
          payload: { message: `Error deleting blog: ${error}`, error: true },
        });
        setTimeout(() => {
          dispatch({ type: "HIDE_NOTIFICATION" });
        }, 5000);
      }
    }
  };

  //React Query fetch data
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAllBlogs,
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>blog service not available due to problem in server</div>;
  }

  const blogs = result.data;

  return (
    <div>
      {/*If the notification state is not null, the Notification component will render with the states' content */}
      {notification.message !== "" && (
        <Notification notification={notification} />
      )}
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
            <NewBlog />
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
