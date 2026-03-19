import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap'

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container>
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <div style={{ width: 36, height: 36, background: '#0d6efd', borderRadius: 8, marginRight: 10 }} />
          <span className="fw-bold">RoomRadar</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Explore</Nav.Link>
            <Nav.Link href="#">My Go-Tos</Nav.Link>
            <Nav.Link href="#">Bookings</Nav.Link>
          </Nav>

          <Form className="d-flex me-3" style={{ maxWidth: 520, width: '100%' }}>
            <FormControl
              type="search"
              placeholder="Search libraries, cafes, or quiet buildings..."
              className="me-2"
              aria-label="Search"
            />
          </Form>

          <div className="d-flex align-items-center">
            <Button variant="outline-primary" className="me-2">Search</Button>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span role="img" aria-label="avatar">👤</span>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
