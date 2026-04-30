import { useEffect, useMemo, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'
import FilterBar from '../components/FilterBar'
import MapPanel from '../components/MapPanel'
import SearchBar from '../components/SearchBar'
import SpaceCard from '../components/SpaceCard'

function getCrowdingLevel(occupancy) {
  if (occupancy <= 40) return 'low'
  if (occupancy <= 70) return 'medium'
  return 'high'
}

export function ExplorePage({
  spaces,
  favoriteIds,
  onToggleFavorite,
  userLocation,
  locationError,
  isLocating,
  onRefreshLocation
}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [noiseFilter, setNoiseFilter] = useState(searchParams.get('noise') || 'all')
  const [crowdingFilter, setCrowdingFilter] = useState(
    searchParams.get('crowding') || 'all'
  )
  const [openNowOnly, setOpenNowOnly] = useState(
    searchParams.get('open') === 'true'
  )

  const [selectedSpaceId, setSelectedSpaceId] = useState(spaces[0]?.id ?? null)

  useEffect(() => {
    const nextParams = {}

    if (query.trim()) nextParams.q = query.trim()
    if (noiseFilter !== 'all') nextParams.noise = noiseFilter
    if (crowdingFilter !== 'all') nextParams.crowding = crowdingFilter
    if (openNowOnly) nextParams.open = 'true'

    setSearchParams(nextParams, { replace: true })
  }, [query, noiseFilter, crowdingFilter, openNowOnly, setSearchParams])

  const filteredSpaces = useMemo(() => {
    return spaces.filter((space) => {
      const searchableText = [
        space.name,
        space.location,
        space.vibe,
        space.noise,
        ...(space.features || []),
      ]
        .join(' ')
        .toLowerCase()

      const matchesQuery =
        query.trim() === '' ||
        searchableText.includes(query.trim().toLowerCase())

      const matchesNoise =
        noiseFilter === 'all' ||
        space.noise.toLowerCase().includes(noiseFilter)

      const matchesCrowding =
        crowdingFilter === 'all' ||
        getCrowdingLevel(space.occupancy) === crowdingFilter

      const matchesOpenNow = !openNowOnly || space.openNow

      return matchesQuery && matchesNoise && matchesCrowding && matchesOpenNow
    })
  }, [spaces, query, noiseFilter, crowdingFilter, openNowOnly])

  const selectedSpace =
    filteredSpaces.find((space) => space.id === selectedSpaceId) ?? filteredSpaces[0] ?? null

  return (
    <main>
      <Container className="py-4">
        <div className="mb-4">
          <h1 className="rr-page-title">Explore</h1>
          <p className="rr-muted mb-3">Results near you</p>

          <SearchBar
            value={query}
            onChange={setQuery}
            onSearch={() => {}}
            placeholder="Search by space name, vibe, feature, or location..."
            label="Search study spaces by name, vibe, feature, or location"
            controlId="explore-search"
          />

          <FilterBar
            noiseFilter={noiseFilter}
            setNoiseFilter={setNoiseFilter}
            crowdingFilter={crowdingFilter}
            setCrowdingFilter={setCrowdingFilter}
            openNowOnly={openNowOnly}
            setOpenNowOnly={setOpenNowOnly}
          />
        </div>

        <Row className="g-4 align-items-start">
          <Col lg={8}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="rr-muted" aria-live="polite">
                Showing {filteredSpaces.length} of {spaces.length}
              </div>
            </div>

            <Row className="g-4">
              {filteredSpaces.map((space) => (
                <Col md={6} key={space.id}>
                  <SpaceCard
                    space={space}
                    isSelected={space.id === selectedSpace?.id}
                    onSelect={(chosenSpace) => setSelectedSpaceId(chosenSpace.id)}
                    isFavorite={favoriteIds.includes(space.id)}
                    onToggleFavorite={onToggleFavorite}
                  />
                </Col>
              ))}

              {filteredSpaces.length === 0 && (
                <Col>
                  <div className="rr-empty-state">
                    <h2 className="h4">No spaces found</h2>
                    <p className="mb-0">
                      Try changing the search text or filters.
                    </p>
                  </div>
                </Col>
              )}
            </Row>
          </Col>

          <Col lg={4}>
            <MapPanel
              selectedSpace={selectedSpace}
              userLocation={userLocation}
              locationError={locationError}
              isLocating={isLocating}
              onRefreshLocation={onRefreshLocation}
            />
          </Col>
        </Row>
      </Container>
    </main>
  )
}