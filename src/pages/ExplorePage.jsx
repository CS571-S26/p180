import { useEffect, useMemo, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import FilterBar from '../components/FilterBar'
import MapPanel from '../components/MapPanel'
import SearchBar from '../components/SearchBar'
import SpaceCard from '../components/SpaceCard'

export function ExplorePage({
  spaces,
  favoriteIds,
  onToggleFavorite,
  userLocation,
  locationError,
  isLocating,
  onRefreshLocation,
  now
}) {
  const [query, setQuery] = useState('')
  const [selectedSpace, setSelectedSpace] = useState(null)
  const [filters, setFilters] = useState({
    quietOnly: false,
    outlets: false,
    openNow: false,
    groupFriendly: false,
    nearby: false
  })

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const text = `${space.name} ${space.location} ${space.type} ${space.vibe}`.toLowerCase()
      const matchesQuery = text.includes(query.toLowerCase())

      const matchesQuiet = !filters.quietOnly || space.noise.toLowerCase().includes('quiet')
      const matchesOutlets = !filters.outlets || space.outlets
      const matchesOpenNow = !filters.openNow || space.openNow
      const matchesGroup = !filters.groupFriendly || space.groupFriendly
      const matchesNearby = !filters.nearby || space.distanceCategory === 'nearby'

      return matchesQuery && matchesQuiet && matchesOutlets && matchesOpenNow && matchesGroup && matchesNearby
    })
  }, [spaces, query, filters])

  useEffect(() => {
    if (filteredSpaces.length === 0) {
      setSelectedSpace(null)
      return
    }

    const stillExists = filteredSpaces.some((space) => space.id === selectedSpace?.id)

    if (!stillExists) {
      setSelectedSpace(filteredSpaces[0])
    }
  }, [filteredSpaces, selectedSpace])

  function toggleFilter(key) {
    setFilters((current) => ({
      ...current,
      [key]: !current[key]
    }))
  }

  function resetFilters() {
    setFilters({
      quietOnly: false,
      outlets: false,
      openNow: false,
      groupFriendly: false,
      nearby: false
    })
  }

  return (
    <main className="py-4">
      <Container>
        <SearchBar
          value={query}
          onChange={setQuery}
          onSearch={() => {}}
          placeholder="Search libraries, cafes, labs..."
        />

        <div className="rr-live-strip mb-3">
          <div>
            <strong>Live Time:</strong>{' '}
            {now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
          </div>

          <div>
            {userLocation
              ? 'Using your current location for distance sorting.'
              : isLocating
              ? 'Getting your location...'
              : 'Using default campus distances.'}
          </div>

          {!userLocation && (
            <Button variant="outline-dark" size="sm" onClick={onRefreshLocation}>
              Refresh Location
            </Button>
          )}
        </div>

        {locationError && (
          <div className="rr-empty-state mb-3">
            {locationError}
          </div>
        )}

        <FilterBar
          filters={filters}
          onToggle={toggleFilter}
          onReset={resetFilters}
        />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mb-3">
          <div>
            <h1 className="rr-page-title mb-1">Explore</h1>
            <p className="rr-muted mb-0">Results near you</p>
          </div>

          <div className="fw-semibold">
            Showing {filteredSpaces.length} of {spaces.length}
          </div>
        </div>

        <Row className="g-4">
          <Col lg={7}>
            <Row className="g-4">
              {filteredSpaces.map((space) => (
                <Col md={6} key={space.id}>
                  <SpaceCard
                    space={space}
                    isFavorite={favoriteIds.includes(space.id)}
                    onToggleFavorite={onToggleFavorite}
                    onSelect={setSelectedSpace}
                    isSelected={selectedSpace?.id === space.id}
                  />
                </Col>
              ))}
            </Row>

            {filteredSpaces.length === 0 && (
              <div className="rr-empty-state mt-4">
                No spaces match your filters.
              </div>
            )}
          </Col>

          <Col lg={5}>
            <MapPanel
              selectedSpace={selectedSpace}
              userLocation={userLocation}
              onRefreshLocation={onRefreshLocation}
            />
          </Col>
        </Row>
      </Container>
    </main>
  )
}