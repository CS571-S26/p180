import { Button } from 'react-bootstrap'

const filterButtons = [
  { key: 'quietOnly', label: 'Quiet vs Social' },
  { key: 'outlets', label: 'Outlets' },
  { key: 'openNow', label: 'Open Now' },
  { key: 'groupFriendly', label: 'Group Friendly' },
  { key: 'nearby', label: 'Distance' }
]

export default function FilterBar({ filters, onToggle, onReset }) {
  const hasActiveFilter = Object.values(filters).some(Boolean)

  return (
    <div className="rr-filterbar">
      <Button
        variant={hasActiveFilter ? 'dark' : 'outline-dark'}
        onClick={onReset}
      >
        All Filters
      </Button>

      {filterButtons.map((filter) => (
        <Button
          key={filter.key}
          variant={filters[filter.key] ? 'dark' : 'outline-secondary'}
          onClick={() => onToggle(filter.key)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}