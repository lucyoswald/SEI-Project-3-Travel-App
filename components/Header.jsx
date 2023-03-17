import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";

const Header = () => {
  const navigationLinks = [
    { title: "Home", slug: "/" },
    { title: "CountryPage", slug: "countries/:id" },
    { title: "AllCountries", slug: "/countries" },
    { title: "Sign Up", slug: "/signup" },
    { title: "Login", slug: "/login" },
    { title: "Sign Out", slug: "/sign-out" },
  ];

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Desgin My Trip</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <ul>
              {navigationLinks.map((link, idx) => (
                <Nav.Link
                  className="header_links"
                  key={idx}
                  as={Link}
                  to={link.slug}
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
