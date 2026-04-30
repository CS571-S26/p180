import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import SpaceCard from '../components/SpaceCard'

export function HomePage({ spaces, favoriteIds, onToggleFavorite }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSearch() {
    const trimmedQuery = query.trim()

    if (trimmedQuery) {
      navigate(`/explore?q=${encodeURIComponent(trimmedQuery)}`)
    } else {
      navigate('/explore')
    }
  }

  return (
    <main>
      <section className="rr-hero-section">
        <Container>
          <div className="rr-hero-copy">
            <h1 className="rr-hero-title">Find the right study space right now.</h1>
            <p className="rr-hero-text">
              RoomRadar helps students discover libraries, lounges, quiet rooms,
              and collaborative spots based on crowding, noise level, outlets,
              and space type.
            </p>
          </div>

          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={handleSearch}
            placeholder="Search libraries, cafes, or quiet buildings..."
            label="Search libraries, cafes, or quiet buildings"
            controlId="home-search"
          />

          <div className="d-flex flex-wrap gap-2 mt-3">
            <Button as={Link} to="/explore" variant="dark">
              Explore Spaces
            </Button>
            <Button as={Link} to="/my-gotos" variant="outline-dark">
              View My Go-Tos
            </Button>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
          <div>
            <h2 className="rr-section-title">Study Spaces Near You</h2>
            <p className="rr-muted">Crowd levels are based on recent student check-ins.</p>
          </div>

          <Button as={Link} to="/explore" variant="outline-dark">
            See All Spaces
          </Button>
        </div>

        <Row className="g-4">
          {spaces.map((space) => (
            <Col md={6} lg={3} key={space.id}>
              <SpaceCard
                space={space}
                clickToOpen={true}
                isFavorite={favoriteIds.includes(space.id)}
                onToggleFavorite={onToggleFavorite}
              />
            </Col>
          ))}
        </Row>

        <section className="rr-callout mt-5">
          <div>
            <h3 className="mb-2">Finding a group room?</h3>
            <p className="mb-0">
              Browse bookable spaces and check where your team can meet next.
            </p>
          </div>

          <Button as={Link} to="/bookings" variant="success">
            Book a Space
          </Button>
        </section>
      </Container>
    </main>
  )
}