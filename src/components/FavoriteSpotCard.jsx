import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CrowdBadge from './CrowdBadge'

export default function FavoriteSpotCard({ space, onToggleFavorite }) {
  return (
    <Card className="border-0 shadow-sm rr-favorite-card">
      <Card.Body>
        <div className="rr-favorite-layout">
          <img
            src={space.image}
            alt={`${space.name} study space`}
            className="rr-favorite-image"
          />

          <div className="rr-favorite-body">
            <div className="d-flex flex-column flex-lg-row justify-content-between gap-3">
              <div>
                <div className="mb-2">
                  <CrowdBadge occupancy={space.occupancy} />
                </div>
                <h2 className="h4 mb-1">{space.name}</h2>
                <p className="rr-muted mb-2">{space.location}</p>
                <div className="rr-feature-list">
                  {space.features.slice(0, 3).map((feature) => (
                    <span key={feature} className="rr-feature-pill">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="d-flex flex-column gap-2 align-items-lg-end">
                <div className="fw-semibold">{space.occupancy}% Full</div>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => onToggleFavorite(space.id)}
                  aria-label={`Remove ${space.name} from My Go-Tos`}
                >
                  Remove
                </Button>
                <Button
                  as={Link}
                  to={`/spaces/${space.id}`}
                  variant="dark"
                  size="sm"
                >
                  Open
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}