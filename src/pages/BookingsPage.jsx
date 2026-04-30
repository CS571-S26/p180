import { Alert, Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'

const bookingRooms = [
  {
    id: 'booking-room-a',
    name: 'Memorial Library Group Room',
    building: 'Memorial Library',
    seats: 6,
    availableText: 'Available from 2:30 PM',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Memorial%20Library%2C%20University%20of%20Wisconsin%2C%20State%20Street%20and%20Campus%20Mall%2C%20Madison%2C%20WI%20-%2054302242192.jpg?width=1200',
    imageAlt: 'Exterior view of Memorial Library on the UW-Madison campus'
  },
  {
    id: 'booking-room-b',
    name: 'Engineering Hall Project Room',
    building: 'Engineering Hall',
    seats: 8,
    availableText: 'Available from 4:00 PM',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Engineering%20Hall%2C%20University%20of%20Wisconsin.jpg?width=1200',
    imageAlt: 'Exterior view of Engineering Hall at UW-Madison'
  },
  {
    id: 'booking-room-c',
    name: 'Union South Quiet Pod',
    building: 'Union South',
    seats: 2,
    availableText: 'Available now',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/University%20of%20Wisconsin%E2%80%93Madison%20August%202022%2053%20%28Union%20South%29.jpg?width=1200',
    imageAlt: 'Exterior view of Union South on the UW-Madison campus'
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
            <Button
              variant="outline-dark"
              onClick={onRequireLogin}
              aria-label="Log in to reserve a study room"
            >
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
                    alt={room.imageAlt || `${room.name} in ${room.building}`}
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
                        aria-label={isReserved ? `Cancel reservation for ${room.name}` : `Reserve ${room.name}`}
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