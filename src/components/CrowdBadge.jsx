export function getCrowdMeta(occupancy) {
  if (occupancy < 40) {
    return { label: 'Low Crowding', tone: 'low' }
  }

  if (occupancy < 70) {
    return { label: 'Medium Crowding', tone: 'medium' }
  }

  return { label: 'High Crowding', tone: 'high' }
}

export default function CrowdBadge({ occupancy }) {
  const meta = getCrowdMeta(occupancy)

  return (
    <span className={`rr-crowd-badge rr-crowd-${meta.tone}`}>
      {meta.label}
    </span>
  )
}