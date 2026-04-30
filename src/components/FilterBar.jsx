import { Form } from 'react-bootstrap'

export default function FilterBar({
  noiseFilter,
  setNoiseFilter,
  crowdingFilter,
  setCrowdingFilter,
  openNowOnly,
  setOpenNowOnly,
}) {
  return (
    <div className="rr-filterbar" aria-label="Study space filters">
      <Form.Group controlId="noise-filter">
        <Form.Label className="visually-hidden">Filter by noise level</Form.Label>
        <Form.Select
          value={noiseFilter}
          onChange={(event) => setNoiseFilter(event.target.value)}
          aria-label="Filter by noise level"
        >
          <option value="all">All noise levels</option>
          <option value="quiet">Quiet</option>
          <option value="moderate">Moderate</option>
          <option value="lively">Lively</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="crowding-filter">
        <Form.Label className="visually-hidden">Filter by crowding level</Form.Label>
        <Form.Select
          value={crowdingFilter}
          onChange={(event) => setCrowdingFilter(event.target.value)}
          aria-label="Filter by crowding level"
        >
          <option value="all">All crowding</option>
          <option value="low">Low crowding</option>
          <option value="medium">Medium crowding</option>
          <option value="high">High crowding</option>
        </Form.Select>
      </Form.Group>

      <Form.Check
        type="switch"
        id="open-now-only"
        label="Open now only"
        checked={openNowOnly}
        onChange={(event) => setOpenNowOnly(event.target.checked)}
      />
    </div>
  )
}