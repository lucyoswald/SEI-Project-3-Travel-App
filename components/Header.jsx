import { Link, useLocation } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-bootstrap";

const Header = () => {
  const navigationLinks = [
    { title: "Sign Up", slug: "/signup" },
    { title: "Login", slug: "/login" },
    { title: "Sign Out", slug: "/sign-out" },
  ];
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [location] = useLocation();

  // useEffect(() => {
  //   setIsLoggedIn(localStorage.getItem("token") ? true : false);
  //   console.log("Location updated");
  //   console.log({ location });
  //   console.log({ navigate });
  // }, [location]);

  // const logOut = () => {
  //   localStorage.removeItem("token");
  //   Navigate("/");
  // };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          Design My Trip
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="all_nav">
          <Nav className="browse_nav">
            <Nav.Link as={Link} to={"/countries"}>
              Browse Countries
            </Nav.Link>
          </Nav>
          <Nav className="login_nav">
            <ul>
              {navigationLinks.map((link, idx) => (
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
