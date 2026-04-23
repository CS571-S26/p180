import { Col, Container, Row } from 'react-bootstrap'
import FavoriteSpotCard from '../components/FavoriteSpotCard'

export function MyGoTosPage({ spaces, favoriteIds, onToggleFavorite }) {
  const savedSpaces = spaces.filter((space) => favoriteIds.includes(space.id))

  return (
    <section className="rr-section">
      <Container>
        <h1 className="rr-page-title mb-3">My Go-Tos</h1>
        <p className="rr-page-subtitle mb-4">
          Your saved favorite study spaces appear here.
        </p>

        {savedSpaces.length === 0 ? (
          <div className="rr-empty-state">
            <h3>No saved spaces yet</h3>
            <p>Go to Explore and click the heart icon to save spaces here.</p>
          </div>
        ) : (
          <Row className="g-4">
            {savedSpaces.map((space) => (
              <Col key={space.id} lg={6}>
                <FavoriteSpotCard
                  space={space}
                  isFavorite={favoriteIds.includes(space.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </section>
  )
}