import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FavoriteSpotCard from '../components/FavoriteSpotCard'

export function MyGoTosPage({ spaces, favoriteIds, onToggleFavorite }) {
  const favoriteSpaces = spaces.filter((space) => favoriteIds.includes(space.id))

  return (
    <main className="py-4">
      <Container>
        <div className="mb-4">
          <h1 className="rr-page-title mb-1">My Go-Tos</h1>
          <p className="rr-muted mb-0">
            Your curated list of preferred study environments.
          </p>
        </div>

        {favoriteSpaces.length === 0 ? (
          <div className="rr-empty-state">
            <p className="mb-3">You have not saved any study spaces yet.</p>
            <Button as={Link} to="/explore" variant="dark">
              Explore Spaces
            </Button>
          </div>
        ) : (
          <div className="d-grid gap-3">
            {favoriteSpaces.map((space) => (
              <FavoriteSpotCard
                key={space.id}
                space={space}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        )}

        <section className="rr-callout rr-soft-callout mt-5">
          <div>
            <h3 className="mb-2">Looking for something new?</h3>
            <p className="mb-0">
              Explore more spaces and save the ones you use most often.
            </p>
          </div>

          <Button as={Link} to="/explore" variant="dark">
            Explore Now
          </Button>
        </section>
      </Container>
    </main>
  )
}