import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBarComponent = () => {
  return (
    <div style={{ paddingTop: "56px" }}>
      <Navbar bg="light" expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand
            href="/driver/all"
            style={{ color: "blue", fontWeight: "bold" }}
          >
            Dashboard
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link to="/driver/all" className="nav-link">
                Home
              </Link>
              <Link to="/trip/real-time" className="nav-link">
                Real Time Analysis
              </Link>
              {/* <Link to="/disabled" className="nav-link" disabled>
                Feature Predictions
              </Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* Content */}
    </div>
  );
};

export default NavBarComponent;
