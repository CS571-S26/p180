import { Button, Card, Col, Container, Row } from 'react-bootstrap'

const bookableRooms = [
  {
    id: 1,
    name: 'Collaboration Room A',
    building: 'Memorial Library',
    seats: 6,
    time: 'Available from 2:30 PM',
    image: 'https://picsum.photos/seed/rooma/900/600'
  },
  {
    id: 2,
    name: 'Project Room B',
    building: 'Engineering Hall',
    seats: 8,
    time: 'Available from 4:00 PM',
    image: 'https://picsum.photos/seed/roomb/900/600'
  },
  {
    id: 3,
    name: 'Quiet Pod 3',
    building: 'Union South',
    seats: 2,
    time: 'Available now',
    image: 'https://picsum.photos/seed/roomc/900/600'
  }
]

export function BookingsPage() {
  return (
    <main className="py-4">
      <Container>
        <div className="mb-4">
          <h1 className="rr-page-title mb-1">Bookings</h1>
          <p className="rr-muted mb-0">
            Lightweight booking preview for group rooms and quiet pods.
          </p>
        </div>

        <Row className="g-4">
          {bookableRooms.map((room) => (
            <Col md={6} lg={4} key={room.id}>
              <Card className="rr-space-card h-100 border-0 shadow-sm">
                <Card.Img variant="top" src={room.image} alt={room.name} className="rr-card-image" />
                <Card.Body>
                  <Card.Title>{room.name}</Card.Title>
                  <p className="rr-muted mb-2">{room.building}</p>
                  <p className="mb-2">Seats: {room.seats}</p>
                  <p className="mb-3">{room.time}</p>
                  <Button variant="dark" size="sm">
                    Reserve
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  )
}