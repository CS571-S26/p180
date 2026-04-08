import './App.css'
import { useEffect, useMemo, useState } from 'react'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { spaces } from './data/spaces'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { MyGoTosPage } from './pages/MyGoTosPage'
import { SpaceDetailsPage } from './pages/SpaceDetailsPage'
import { BookingsPage } from './pages/BookingsPage'
import { useCurrentTime } from './hooks/useCurrentTime'
import { useUserLocation } from './hooks/useUserLocation'
import {
  buildActivityFeed,
  getDistanceCategory,
  getDistanceText,
  getHoursLabel,
  getLiveOccupancy,
  isSpaceOpenNow
} from './utils/liveData'

const FAVORITES_KEY = 'room-radar-favorites'
const CHECKINS_KEY = 'room-radar-checkins'
const ACTIVITY_KEY = 'room-radar-activity'

function readLocal(key, fallback) {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : fallback
}

function App() {
  const now = useCurrentTime(60000)
  const { userLocation, locationError, isLocating, refreshLocation } = useUserLocation()

  const [favoriteIds, setFavoriteIds] = useState(() =>
    readLocal(FAVORITES_KEY, ['main-library', 'engineering-hall-a'])
  )

  const [checkedInIds, setCheckedInIds] = useState(() =>
    readLocal(CHECKINS_KEY, [])
  )

  const [activityEvents, setActivityEvents] = useState(() =>
    readLocal(ACTIVITY_KEY, [])
  )

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  useEffect(() => {
    localStorage.setItem(CHECKINS_KEY, JSON.stringify(checkedInIds))
  }, [checkedInIds])

  useEffect(() => {
    localStorage.setItem(ACTIVITY_KEY, JSON.stringify(activityEvents))
  }, [activityEvents])

  const displaySpaces = useMemo(() => {
    return spaces.map((space) => {
      const relatedEvents = activityEvents.filter((event) => event.spaceId === space.id)
      const isCheckedIn = checkedInIds.includes(space.id)

      return {
        ...space,
        occupancy: getLiveOccupancy(space.occupancy, relatedEvents, isCheckedIn, now),
        openNow: isSpaceOpenNow(space, now),
        hoursLabel: getHoursLabel(space, now),
        distanceText: getDistanceText(space, userLocation),
        distanceCategory: getDistanceCategory(space, userLocation),
        recentActivity: buildActivityFeed(space, relatedEvents, now)
      }
    })
  }, [activityEvents, checkedInIds, now, userLocation])

  function toggleFavorite(id) {
    setFavoriteIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  }

  function toggleCheckIn(id) {
    const isAlreadyCheckedIn = checkedInIds.includes(id)

    setCheckedInIds((current) =>
      isAlreadyCheckedIn
        ? current.filter((item) => item !== id)
        : [...current, id]
    )

    setActivityEvents((current) => [
      {
        spaceId: id,
        action: isAlreadyCheckedIn ? 'checked out' : 'checked in',
        createdAt: new Date().toISOString()
      },
      ...current
    ].slice(0, 50))
  }

  return (
    <HashRouter>
      <div className="rr-app-shell">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                spaces={displaySpaces.slice(0, 4)}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <ExplorePage
                spaces={displaySpaces}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
                userLocation={userLocation}
                locationError={locationError}
                isLocating={isLocating}
                onRefreshLocation={refreshLocation}
                now={now}
              />
            }
          />
          <Route
            path="/my-gotos"
            element={
              <MyGoTosPage
                spaces={displaySpaces}
                favoriteIds={favoriteIds}
                onToggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route
            path="/spaces/:id"
            element={
              <SpaceDetailsPage
                spaces={displaySpaces}
                favoriteIds={favoriteIds}
                checkedInIds={checkedInIds}
                onToggleFavorite={toggleFavorite}
                onToggleCheckIn={toggleCheckIn}
                now={now}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App