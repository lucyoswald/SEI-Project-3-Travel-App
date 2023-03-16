import { Link } from "react-router-dom";

const Header = () => {
  const navigationLinks = [{ title: "Home", slug: "/" }];

  return (
    <body>
      <header className="header">
        <nav>
          <ul>
            {navigationLinks.map((link, idx) => (
              <Link className="header_links" key={idx} to={link.slug}>
                <li> {link.title}</li>
              </Link>
            ))}
          </ul>
        </nav>
      </header>
    </body>
  );
};

export default Header;
