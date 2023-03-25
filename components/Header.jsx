import { Link, useLocation, Navigate, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";

const Header = () => {
  const loggedOutNavigationLinks = [
    { title: "Sign Up", slug: "/signup" },
    { title: "Login", slug: "/login" },
  ];
  const loggedInNavigationLinks = [
    { title: "My Itinerary", slug: "/myitinerary" },
    { title: "Sign Out", slug: "/" },
  ];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("token") ? true : false);
    console.log("Location updated");
    // console.log({ location });
    // console.log({ navigate });
  }, [location]);
  console.log(isLoggedIn);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Design My Trip
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="all_nav">
          <Nav className="browse_nav">
            <Nav.Link as={Link} to={"/countries"} onClick="hide.bs.dropdown">
              Browse Countries
            </Nav.Link>
          </Nav>
          <Nav className="login_nav">
            <ul>
              {isLoggedIn
                ? loggedInNavigationLinks.map((link, idx) => (
                    <Nav.Link
                      className="login_links"
                      key={idx}
                      as={Link}
                      to={link.slug}
                      // onClick="hide.bs.dropdown"
                      onClick={link.title === "Sign Out" && logOut}
                    >
                      <li>{link.title}</li>
                    </Nav.Link>
                  ))
                : loggedOutNavigationLinks.map((link, idx) => (
                    <Nav.Link
                      className="login_links"
                      key={idx}
                      as={Link}
                      to={link.slug}
                      onClick="hide.bs.dropdown"
                    >
                      <li>{link.title}</li>
                    </Nav.Link>
                  ))}
            </ul>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
