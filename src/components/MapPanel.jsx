import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CrowdBadge from './CrowdBadge'
import { buildMapEmbedUrl } from '../utils/liveData'

export default function MapPanel({ selectedSpace, userLocation, onRefreshLocation }) {
  if (!selectedSpace) {
    return (
      <Card className="rr-map-panel border-0 shadow-sm">
        <Card.Body>
          <p className="mb-0">No space selected.</p>
        </Card.Body>
      </Card>
    )
  }

  const mapUrl = buildMapEmbedUrl(selectedSpace.coordinates)

  return (
    <Card className="rr-map-panel border-0 shadow-sm">
      <div className="rr-map-shell">
        <iframe
          title="Selected study space map"
          className="rr-map-frame"
          src={mapUrl}
        />
      </div>

      <Card.Body>
        <p className="rr-muted small mb-2">Selected Space</p>
        <h5 className="mb-1">{selectedSpace.name}</h5>
        <p className="rr-muted">{selectedSpace.location}</p>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <CrowdBadge occupancy={selectedSpace.occupancy} />
          <span className="fw-semibold">{selectedSpace.distanceText}</span>
        </div>

        <p className="rr-muted small mb-3">{selectedSpace.hoursLabel}</p>

        <div className="d-flex flex-wrap gap-2">
          <Button as={Link} to={`/spaces/${selectedSpace.id}`} variant="dark" size="sm">
            Open Details
          </Button>

          <Button
            as="a"
            href={`https://www.google.com/maps/search/?api=1&query=${selectedSpace.coordinates.lat},${selectedSpace.coordinates.lng}`}
            target="_blank"
            rel="noreferrer"
            variant="outline-secondary"
            size="sm"
          >
            Open in Maps
          </Button>

          {!userLocation && (
            <Button variant="outline-secondary" size="sm" onClick={onRefreshLocation}>
              Use My Location
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}