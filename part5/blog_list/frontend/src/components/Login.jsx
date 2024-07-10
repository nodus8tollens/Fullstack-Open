import PropTypes from "prop-types";

const Login = ({
  username,
  password,
  usernameChange,
  passwordChange,
  handleLogin,
}) => {
  return (
    <>
      <h3>Log In:</h3>
      <form onSubmit={handleLogin} data-testid="login-form">
        <label htmlFor="Username">Username: </label>
        <input
          type="text"
          placeholder="John Doe"
          value={username}
          onChange={usernameChange}
        />
        <br />
        <label htmlFor="Password">Password: </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={passwordChange}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </>
  );
};

Login.PropTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  usernameChange: PropTypes.func.isRequired,
  passwordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
