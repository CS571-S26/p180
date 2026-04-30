import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { Navigate, useParams } from 'react-router-dom'
import CrowdBadge from '../components/CrowdBadge'

const FEEDBACK_KEY = 'room-radar-feedback'

function readFeedbackStore() {
  try {
    const value = localStorage.getItem(FEEDBACK_KEY)
    return value ? JSON.parse(value) : {}
  } catch {
    return {}
  }
}

export function SpaceDetailsPage({
  spaces,
  favoriteIds,
  checkedInIds,
  onToggleFavorite,
  onToggleCheckIn,
  now
}) {
  const { id } = useParams()
  const space = spaces.find((item) => item.id === id)

  const [feedbackStore, setFeedbackStore] = useState(() => readFeedbackStore())

  useEffect(() => {
    localStorage.setItem(FEEDBACK_KEY, JSON.stringify(feedbackStore))
  }, [feedbackStore])

  if (!space) {
    return <Navigate to="/explore" replace />
  }

  const isFavorite = favoriteIds.includes(space.id)
  const isCheckedIn = checkedInIds.includes(space.id)

  const feedbackForSpace = feedbackStore[space.id] || {
    accurate: 18,
    incorrect: 2,
    userVote: null
  }

  function handleVote(voteType) {
    setFeedbackStore((current) => {
      const next = { ...current }

      const existing = next[space.id] || {
        accurate: 18,
        incorrect: 2,
        userVote: null
      }

      if (existing.userVote === voteType) {
        return current
      }

      const updated = { ...existing }

      if (existing.userVote === 'accurate') {
        updated.accurate = Math.max(0, updated.accurate - 1)
      }

      if (existing.userVote === 'incorrect') {
        updated.incorrect = Math.max(0, updated.incorrect - 1)
      }

      if (voteType === 'accurate') {
        updated.accurate += 1
      }

      if (voteType === 'incorrect') {
        updated.incorrect += 1
      }

      updated.userVote = voteType
      next[space.id] = updated

      return next
    })
  }

  return (
    <main className="py-4">
      <Container className="rr-details-page">
        <img
          src={space.image}
          alt={space.imageAlt || `${space.name} study space`}
          className="rr-detail-hero"
        />
        
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3 mb-4">
          <div>
            <h1 className="rr-page-title mb-2">{space.name}</h1>
            <p className="rr-muted mb-1">
              {space.location} • {space.vibe}
            </p>
            <p className="rr-muted mb-0">
              {space.openNow ? 'Open Now' : 'Closed'} • {space.hours} • Last updated at{' '}
              {now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
            </p>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <Button
              variant={isFavorite ? 'dark' : 'outline-dark'}
              onClick={() => onToggleFavorite(space.id)}
              aria-label={isFavorite ? `Remove ${space.name} from My Go-Tos` : `Save ${space.name} to My Go-Tos`}
            >
              {isFavorite ? 'Saved' : 'Save to My Go-Tos'}
            </Button>

            <Button
              variant={isCheckedIn ? 'danger' : 'dark'}
              onClick={() => onToggleCheckIn(space.id)}
              aria-label={isCheckedIn ? `Check out of ${space.name}` : `Check in to ${space.name}`}
            >
              {isCheckedIn ? 'Check Out' : 'Check In to this Space'}
            </Button>
          </div>
        </div>

        <Row className="g-4 mb-4">
          <Col md={6}>
            <Card className="rr-info-card h-100">
              <Card.Body>
                <div className="rr-small-label">Current Occupancy</div>
                <div className="rr-info-number">{space.occupancy}% Full</div>
                <ProgressBar
                  now={space.occupancy}
                  className="rr-progress"
                  aria-label={`${space.occupancy}% full`}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="rr-info-card h-100">
              <Card.Body>
                <div className="rr-small-label">Noise Level</div>
                <div className="rr-info-number">{space.noise}</div>
                <div className="mt-3">
                  <CrowdBadge occupancy={space.occupancy} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="g-4">
          <Col lg={6}>
            <Card className="rr-list-card h-100">
              <Card.Body>
                <h2 className="h4 mb-3">Amenities</h2>
                <ul className="rr-list">
                  {space.amenities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <h2 className="h4 mt-4 mb-3">Accessibility Notes</h2>
                <ul className="rr-list">
                  {space.accessibility.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="rr-list-card mb-4">
              <Card.Body>
                <h2 className="h4 mb-3">Was this accurate today?</h2>

                <div className="rr-feedback-grid">
                  <Button
                    variant={feedbackForSpace.userVote === 'accurate' ? 'success' : 'outline-success'}
                    onClick={() => handleVote('accurate')}
                    aria-pressed={feedbackForSpace.userVote === 'accurate'}
                  >
                    Accurate ({feedbackForSpace.accurate})
                  </Button>

                  <Button
                    variant={feedbackForSpace.userVote === 'incorrect' ? 'danger' : 'outline-danger'}
                    onClick={() => handleVote('incorrect')}
                    aria-pressed={feedbackForSpace.userVote === 'incorrect'}
                  >
                    Incorrect ({feedbackForSpace.incorrect})
                  </Button>
                </div>

                {feedbackForSpace.userVote && (
                  <p className="rr-muted small mt-3 mb-0" aria-live="polite">
                    You marked this as <strong>{feedbackForSpace.userVote}</strong> for this space.
                  </p>
                )}
              </Card.Body>
            </Card>

            <Card className="rr-list-card">
              <Card.Body>
                <h2 className="h4 mb-3">Recent Activity</h2>
                <ul className="rr-list">
                  {space.recentActivity.map((item) => (
                    <li key={`${item.text}-${item.time}`}>
                      <strong>{item.text}</strong>
                      <div className="rr-muted small">{item.time}</div>
                    </li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  )
}