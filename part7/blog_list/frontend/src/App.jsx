import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import { useNotification } from "./context/NotificationContext";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "./context/UserContext";

const App = () => {
  const { state: userState, dispatch: userDispatch } = useUser();
  const { state: notification, dispatch: notificationDispatch } =
    useNotification();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      userDispatch({ type: "USER_LOGIN", payload: loggedUser });
      blogService.setToken(loggedUser.token);
    }
  }, [userDispatch]);

  const handleLogout = () => {
    try {
      window.localStorage.removeItem("loggedBlogUser");
      userDispatch({ type: "USER_LOGOUT" });
      notificationDispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Logged out successfully", error: false },
      });
      setTimeout(() => {
        notificationDispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    } catch (error) {
      notificationDispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          message: `Error logging out: ${error}`,
          error: true,
        },
      });
      setTimeout(() => {
        notificationDispatch({ type: "HIDE_NOTIFICATION" });
      }, 5000);
    }
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAllBlogs,
  });

  if (userState.user === null) {
    return <Login />;
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
        <p>{userState.user.name} has logged in</p>
        <button data-testid="logout-button" onClick={handleLogout}>
          Log Out
        </button>
        <Togglable buttonLabel={{ show: "New Note", hide: "Cancel" }}>
          <NewBlog />
        </Togglable>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={userState.user} />
        ))}
      </div>
    </div>
  );
};

export default App;
