import React, { useState } from "react";
import loginService from "../services/login";
import { useUser } from "../context/UserContext";
import { useNotification } from "../context/NotificationContext";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch: userDispatch } = useUser();
  const { dispatch: notificationDispatch } = useNotification();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      userDispatch({ type: "USER_LOGIN", payload: user });
      setUsername("");
      setPassword("");
      notificationDispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: "Login successful", error: false },
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE_NOTIFICATION",
        });
      }, 5000);
    } catch (error) {
      notificationDispatch({
        type: "SHOW_NOTIFICATION",
        payload: { message: `Error logging in: ${error.message}`, error: true },
      });
      setTimeout(() => {
        notificationDispatch({
          type: "HIDE_NOTIFICATION",
        });
      }, 5000);
    }
  };

  return (
    <>
      <h3>Log In:</h3>
      <Form onSubmit={handleLogin} data-testid="login-form">
        <Form.Group>
          <Form.Label htmlFor="Username">Username: </Form.Label>
          <Form.Control
            data-testid="login-username"
            type="text"
            placeholder="John Doe"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="Password">Password: </Form.Label>
          <Form.Control
            data-testid="login-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </Form.Group>

        <Button variant="primary" data-testid="login-submit" type="submit">
          login
        </Button>
      </Form>
    </>
  );
};

export default Login;
