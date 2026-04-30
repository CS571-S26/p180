import { Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CrowdBadge from './CrowdBadge'
import { buildMapEmbedUrl, getDistanceText } from '../utils/liveData'

export default function MapPanel({
  selectedSpace,
  userLocation,
  locationError,
  isLocating,
  onRefreshLocation
}) {
  if (!selectedSpace) {
    return (
      <Card className="rr-map-panel border-0 shadow-sm">
        <Card.Body>
          <h2 className="h5 mb-2">No space selected</h2>
          <p className="rr-muted mb-0">Choose a space from the results to view it on the map.</p>
        </Card.Body>
      </Card>
    )
  }

  const mapUrl = buildMapEmbedUrl(selectedSpace.coordinates)
  const distanceText = getDistanceText(selectedSpace, userLocation)

  return (
    <Card className="rr-map-panel border-0 shadow-sm">
      <div className="rr-map-shell">
        <iframe
          title={`Map showing ${selectedSpace.name}`}
          className="rr-map-frame"
          src={mapUrl}
          loading="lazy"
        />
      </div>

      <Card.Body>
        <p className="rr-muted small mb-2">Selected Space</p>
        <h2 className="h5 mb-1">{selectedSpace.name}</h2>
        <p className="rr-muted">{selectedSpace.location}</p>

        <div className="d-flex align-items-center justify-content-between mb-3">
          <CrowdBadge occupancy={selectedSpace.occupancy} />
          <span className="fw-semibold">{distanceText}</span>
        </div>

        <p className="rr-muted small mb-3">
          {selectedSpace.openNow ? 'Open Now' : 'Closed'} • {selectedSpace.hours}
        </p>

        {locationError && (
          <p className="text-danger small mb-3" role="alert">
            {locationError}
          </p>
        )}

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

          <Button
            variant="outline-secondary"
            size="sm"
            onClick={onRefreshLocation}
            disabled={isLocating}
          >
            {isLocating ? 'Locating...' : 'Use My Location'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}