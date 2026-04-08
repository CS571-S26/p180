import { Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CrowdBadge from './CrowdBadge'

export default function SpaceCard({
  space,
  isFavorite = false,
  onToggleFavorite = () => {},
  onSelect = null,
  isSelected = false,
  clickToOpen = false
}) {
  const navigate = useNavigate()

  function handleCardClick() {
    if (clickToOpen) {
      navigate(`/spaces/${space.id}`)
      return
    }

    if (onSelect) {
      onSelect(space)
    }
  }

  return (
    <Card
      className={`rr-space-card h-100 border-0 shadow-sm ${isSelected ? 'rr-space-card-selected' : ''}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
    >
      <div className="rr-card-image-wrap">
        <Card.Img variant="top" src={space.image} alt={space.name} className="rr-card-image" />

        <div className="rr-card-top-row">
          <CrowdBadge occupancy={space.occupancy} />

          <button
            className="rr-heart-btn"
            onClick={(event) => {
              event.stopPropagation()
              onToggleFavorite(space.id)
            }}
          >
            {isFavorite ? '♥' : '♡'}
          </button>
        </div>
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
          <div>
            <Card.Title className="mb-1">{space.name}</Card.Title>
            <div className="rr-muted small">{space.location}</div>
          </div>
          <div className="rr-distance">{space.distanceText}</div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className={`rr-live-pill ${space.openNow ? 'open' : 'closed'}`}>
            {space.openNow ? 'Open Now' : 'Closed'}
          </span>
          <span className="rr-muted small">{space.hoursLabel}</span>
        </div>

        <div className="rr-muted mb-2">
          {space.vibe} • {space.noise}
        </div>

        <div className="rr-feature-list mb-3">
          {space.features.slice(0, 3).map((feature) => (
            <span key={feature} className="rr-feature-pill">
              {feature}
            </span>
          ))}
        </div>

        <div className="mt-auto d-flex gap-2">
          <Button
            as={Link}
            to={`/spaces/${space.id}`}
            variant="outline-dark"
            size="sm"
            onClick={(event) => event.stopPropagation()}
          >
            Details
          </Button>

          <Button
            variant={isFavorite ? 'dark' : 'success'}
            size="sm"
            onClick={(event) => {
              event.stopPropagation()
              onToggleFavorite(space.id)
            }}
          >
            {isFavorite ? 'Remove' : 'Save'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}