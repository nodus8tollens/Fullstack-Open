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
      <form onSubmit={handleLogin}>
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

export default Login;
