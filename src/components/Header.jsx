import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

export default function Header({ isLoggedIn, currentUser, onLoginClick, onLogout }) {
  return (
    <Navbar bg="white" expand="lg" className="border-bottom py-3">
      <Container>
        <Navbar.Brand
          as={NavLink}
          to="/"
          className="fw-bold fs-3"
          style={{ color: '#23206f' }}
        >
          RoomRadar
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="roomradar-nav" />
        <Navbar.Collapse id="roomradar-nav">
          <Nav className="me-auto ms-3">
            <Nav.Link as={NavLink} to="/explore">
              Explore
            </Nav.Link>
            <Nav.Link as={NavLink} to="/my-gotos">
              My Go-Tos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/bookings">
              Bookings
            </Nav.Link>
          </Nav>

          <div className="d-flex align-items-center gap-3">
            <span role="img" aria-label="notifications">
              🔔
            </span>

            {isLoggedIn ? (
              <>
                <span className="text-muted small">Hi, {currentUser?.name || 'Student'}</span>
                <Button variant="dark" onClick={onLogout}>
                  Log Out
                </Button>
              </>
            ) : (
              <Button variant="dark" onClick={onLoginClick}>
                Log In
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}