import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";

const Header = () => {
  const navigationLinks = [
    // { title: "Home", slug: "/" },
    // { title: "Country Page", slug: "countries/:id" },
    { title: "Browse Countries", slug: "/countries" },
    { title: "Sign Up", slug: "/signup" },
    { title: "Login", slug: "/login" },
    { title: "Sign Out", slug: "/sign-out" },
  ];

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Design My Trip
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="all_nav">
          <Nav>
            <ul>
              {navigationLinks.map((link, idx) => (
                <Nav.Link
                  className="header_links"
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
