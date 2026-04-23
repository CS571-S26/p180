import { Alert, Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'

const bookingRooms = [
  {
    id: 'booking-room-a',
    name: 'Collaboration Room A',
    building: 'Memorial Library',
    seats: 6,
    availableText: 'Available from 2:30 PM',
    image:
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'booking-room-b',
    name: 'Project Room B',
    building: 'Engineering Hall',
    seats: 8,
    availableText: 'Available from 4:00 PM',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'booking-room-c',
    name: 'Quiet Pod 3',
    building: 'Union South',
    seats: 2,
    availableText: 'Available now',
    image:
      'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1200&q=80'
  }
]

export function BookingsPage({
  isLoggedIn,
  reservedRoomIds,
  onToggleReservation,
  onRequireLogin
}) {
  const reservedCount = bookingRooms.filter((room) =>
    reservedRoomIds.includes(room.id)
  ).length

  return (
    <section className="rr-section py-5">
      <Container>
        <h1 className="rr-page-title mb-2">Bookings</h1>
        <p className="rr-page-subtitle mb-4">
          Lightweight booking preview for group rooms and quiet pods.
        </p>

        <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
          <Badge bg="dark" className="px-3 py-2 fs-6">
            Reserved Rooms: {reservedCount}
          </Badge>

          {!isLoggedIn && (
            <Button variant="outline-dark" onClick={onRequireLogin}>
              Log in to Reserve
            </Button>
          )}
        </div>

        {!isLoggedIn && (
          <Alert variant="info" className="mb-4">
            You are currently browsing as a guest. Log in to reserve a room.
          </Alert>
        )}

        <Row className="g-4">
          {bookingRooms.map((room) => {
            const isReserved = reservedRoomIds.includes(room.id)

            return (
              <Col key={room.id} md={6} lg={4}>
                <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <Card.Img
                    variant="top"
                    src={room.image}
                    alt={room.name}
                    style={{ height: '235px', objectFit: 'cover' }}
                  />

                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold">{room.name}</Card.Title>
                    <div className="text-muted mb-3">{room.building}</div>

                    <p className="mb-2">Seats: {room.seats}</p>
                    <p className="mb-3">{room.availableText}</p>

                    {isReserved ? (
                      <Badge bg="success" className="align-self-start mb-3">
                        Reserved
                      </Badge>
                    ) : (
                      <Badge bg="secondary" className="align-self-start mb-3">
                        Open
                      </Badge>
                    )}

                    <div className="mt-auto">
                      <Button
                        variant={isReserved ? 'outline-danger' : 'dark'}
                        onClick={() => {
                          if (!isLoggedIn) {
                            onRequireLogin()
                            return
                          }
                          onToggleReservation(room.id)
                        }}
                      >
                        {isReserved ? 'Cancel Reservation' : 'Reserve'}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}