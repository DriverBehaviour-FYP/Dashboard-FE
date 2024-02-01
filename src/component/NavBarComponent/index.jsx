import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBarComponent = () => {
  return (
    <Navbar bg="light" expand="lg" className="mb-2">
      <Container>
        <Navbar.Brand href="/" style={{ color: "#800080", fontWeight: "bold" }}>
          Dashboard
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/pricing" className="nav-link">
              Home
            </Link>
            <Link to="/features" className="nav-link">
              Real Time Analysis
            </Link>
            {/* <Link to="/disabled" className="nav-link" disabled>
              Feature Predictions
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;
