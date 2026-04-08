import { Container } from 'react-bootstrap'

export default function Footer() {
  return (
    <footer className="rr-footer">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <div className="fw-semibold">RoomRadar</div>
        <div className="rr-muted small">
          © 2026 RoomRadar. Built for campus study-space discovery.
        </div>
      </Container>
    </footer>
  )
}