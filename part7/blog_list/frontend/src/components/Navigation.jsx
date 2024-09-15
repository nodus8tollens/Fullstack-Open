import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const Navigation = ({ userState, handleLogout }) => {
  const navStyle = {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    padding: "10px",
    color: "grey",
  };

  const navLinkStyle = {
    padding: "10px 15px", // Padding for each Nav.Link
    textDecoration: "none", // Ensures the links look clean
  };

  return (
    <Navbar
      style={navStyle}
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={navLinkStyle}>
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users" style={navLinkStyle}>
              Users
            </Link>
          </Nav.Link>

          <Nav.Link href="#" as="span">
            {userState.user ? (
              <em style={{ color: "black" }}>
                {userState.user.name} logged in
              </em>
            ) : (
              <Link to="/login" style={navLinkStyle}>
                Login
              </Link>
            )}
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <button type="button" onClick={handleLogout}>
              {" "}
              Log Out
            </button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
