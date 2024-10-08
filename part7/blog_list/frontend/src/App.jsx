import { useEffect } from "react";
import Login from "./components/Login";
import Notification from "./components/Notification";
import Users from "./components/Users";
import Blogs from "./components/Blogs";
import BlogList from "./components/BlogList";
import BlogCard from "./components/BlogCard";
import Navigation from "./components/Navigation";
import blogService from "./services/blogs";
import { useNotification } from "./context/NotificationContext";
import { useUser } from "./context/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

  if (userState.user === null) {
    return <Login />;
  }

  return (
    <Router>
      <div className="container">
        <Navigation userState={userState} handleLogout={handleLogout} />
        <h2>Blog App</h2>

        {notification.message !== "" && (
          <Notification notification={notification} />
        )}

        <Routes>
          <Route path="/" element={<Blogs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<BlogList />} />
          <Route path="/blogs/:id" element={<BlogCard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
