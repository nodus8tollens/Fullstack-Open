import { Link } from "react-router-dom";

const Navigation = ({ userState, handleLogout }) => {
  const style = {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "lightgray",
  };

  return (
    <div>
      <nav style={style}>
        <Link to={"/"}>Blogs</Link>
        <Link to={"/users"}>Users</Link>
        <p>{userState.user.name} has logged in</p>
        <button data-testid="logout-button" onClick={handleLogout}>
          Log Out
        </button>
      </nav>
    </div>
  );
};

export default Navigation;
