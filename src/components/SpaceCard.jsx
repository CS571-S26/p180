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
  const isInteractiveCard = clickToOpen || Boolean(onSelect)

  function handleCardClick(event) {
    if (event.target.closest('a, button')) {
      return
    }

    if (clickToOpen) {
      navigate(`/spaces/${space.id}`)
      return
    }

    if (onSelect) {
      onSelect(space)
    }
  }

  function handleCardKeyDown(event) {
    if (!isInteractiveCard) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleCardClick(event)
    }
  }

  function handleFavoriteClick(event) {
    event.stopPropagation()
    onToggleFavorite(space.id)
  }

  return (
    <Card
      className={`rr-space-card h-100 border-0 shadow-sm ${isSelected ? 'rr-space-card-selected' : ''}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role={isInteractiveCard ? 'button' : undefined}
      tabIndex={isInteractiveCard ? 0 : undefined}
      aria-label={isInteractiveCard ? `Select ${space.name}` : undefined}
      aria-pressed={onSelect ? isSelected : undefined}
      style={{ cursor: isInteractiveCard ? 'pointer' : 'default' }}
    >
      <div className="rr-card-image-wrap">
        <Card.Img
          variant="top"
          src={space.image}
          alt={space.imageAlt || `${space.name} study space`}
          className="rr-card-image"
        />
        <div className="rr-card-top-row">
          <CrowdBadge occupancy={space.occupancy} />
          <button
            type="button"
            className="rr-heart-btn"
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? `Remove ${space.name} from My Go-Tos` : `Save ${space.name} to My Go-Tos`}
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
          <span className="rr-muted small">{space.hours}</span>
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
          <Button as={Link} to={`/spaces/${space.id}`} variant="outline-dark">
            Details
          </Button>

          <Button
            variant={isFavorite ? 'success' : 'outline-success'}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? `Remove ${space.name} from My Go-Tos` : `Save ${space.name} to My Go-Tos`}
          >
            {isFavorite ? 'Saved' : 'Save'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}