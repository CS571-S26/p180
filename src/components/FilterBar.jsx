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
    <div className="rr-filterbar">
      <Form.Select
        value={noiseFilter}
        onChange={(event) => setNoiseFilter(event.target.value)}
      >
        <option value="all">All noise levels</option>
        <option value="quiet">Quiet</option>
        <option value="moderate">Moderate</option>
        <option value="lively">Lively</option>
      </Form.Select>

      <Form.Select
        value={crowdingFilter}
        onChange={(event) => setCrowdingFilter(event.target.value)}
      >
        <option value="all">All crowding</option>
        <option value="low">Low crowding</option>
        <option value="medium">Medium crowding</option>
        <option value="high">High crowding</option>
      </Form.Select>

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