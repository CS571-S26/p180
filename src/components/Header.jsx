import { Container, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <Navbar expand="lg" className="rr-navbar sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="rr-brand">
          <div className="rr-brand-box">▦</div>
          <span>RoomRadar</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="rr-main-nav" />

        <Navbar.Collapse id="rr-main-nav">
          <nav className="rr-nav-links me-auto">
            <NavLink to="/explore" className={({ isActive }) => `rr-nav-link ${isActive ? 'active' : ''}`}>
              Explore
            </NavLink>
            <NavLink to="/my-gotos" className={({ isActive }) => `rr-nav-link ${isActive ? 'active' : ''}`}>
              My Go-Tos
            </NavLink>
            <NavLink to="/bookings" className={({ isActive }) => `rr-nav-link ${isActive ? 'active' : ''}`}>
              Bookings
            </NavLink>
          </nav>

          <div className="rr-header-actions">
            <span className="rr-header-icon">🔔</span>
            <span className="rr-header-avatar">JD</span>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}