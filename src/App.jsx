import { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import LoginModal from './components/LoginModal'
import { spaces as allSpaces } from './data/spaces'
import { HomePage } from './pages/HomePage'
import { ExplorePage } from './pages/ExplorePage'
import { MyGoTosPage } from './pages/MyGoTosPage'
import { BookingsPage } from './pages/BookingsPage'
import { SpaceDetailsPage } from './pages/SpaceDetailsPage'

const FAVORITES_KEY = 'roomradar-favorites'
const LOGIN_KEY = 'roomradar-login'
const USER_KEY = 'roomradar-user'
const BOOKINGS_KEY = 'roomradar-bookings'

function getStoredArray(key) {
  try {
    const saved = JSON.parse(localStorage.getItem(key))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

function getStoredUser() {
  try {
    const saved = JSON.parse(localStorage.getItem(USER_KEY))
    return saved || null
  } catch {
    return null
  }
}

export default function App() {
  const [favoriteIds, setFavoriteIds] = useState(() => getStoredArray(FAVORITES_KEY))
  const [checkedInIds, setCheckedInIds] = useState([])
  const [userLocation, setUserLocation] = useState(null)
  const [locationError, setLocationError] = useState('')
  const [isLocating, setIsLocating] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem(LOGIN_KEY) === 'true')
  const [currentUser, setCurrentUser] = useState(() => getStoredUser())
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [reservedRoomIds, setReservedRoomIds] = useState(() => getStoredArray(BOOKINGS_KEY))

  const spaces = useMemo(() => allSpaces, [])
  const now = new Date()

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(reservedRoomIds))
  }, [reservedRoomIds])

  useEffect(() => {
    localStorage.setItem(LOGIN_KEY, isLoggedIn ? 'true' : 'false')
  }, [isLoggedIn])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(currentUser))
    } else {
      localStorage.removeItem(USER_KEY)
    }
  }, [currentUser])

  function handleToggleFavorite(spaceId) {
    setFavoriteIds((current) =>
      current.includes(spaceId)
        ? current.filter((id) => id !== spaceId)
        : [...current, spaceId]
    )
  }

  function handleToggleCheckIn(spaceId) {
    setCheckedInIds((current) =>
      current.includes(spaceId)
        ? current.filter((id) => id !== spaceId)
        : [...current, spaceId]
    )
  }

  function handleRefreshLocation() {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported in this browser.')
      return
    }

    setIsLocating(true)
    setLocationError('')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        })
        setIsLocating(false)
      },
      () => {
        setLocationError('Unable to access your location right now.')
        setIsLocating(false)
      }
    )
  }

  function handleLogin(user) {
    setIsLoggedIn(true)
    setCurrentUser(user)
    setShowLoginModal(false)
  }

  function handleLogout() {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setReservedRoomIds([])
  }

  function handleToggleReservation(roomId) {
    setReservedRoomIds((current) =>
      current.includes(roomId)
        ? current.filter((id) => id !== roomId)
        : [...current, roomId]
    )
  }

  return (
    <div className="rr-app-shell">
      <Header
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
      />

      <main className="rr-main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                spaces={spaces}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />

          <Route
            path="/explore"
            element={
              <ExplorePage
                spaces={spaces}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
                userLocation={userLocation}
                locationError={locationError}
                isLocating={isLocating}
                onRefreshLocation={handleRefreshLocation}
                now={now}
              />
            }
          />

          <Route
            path="/my-gotos"
            element={
              <MyGoTosPage
                spaces={spaces}
                favoriteIds={favoriteIds}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />

          <Route
            path="/bookings"
            element={
              <BookingsPage
                isLoggedIn={isLoggedIn}
                reservedRoomIds={reservedRoomIds}
                onToggleReservation={handleToggleReservation}
                onRequireLogin={() => setShowLoginModal(true)}
              />
            }
          />

          <Route
            path="/spaces/:id"
            element={
              <SpaceDetailsPage
                spaces={spaces}
                favoriteIds={favoriteIds}
                checkedInIds={checkedInIds}
                onToggleFavorite={handleToggleFavorite}
                onToggleCheckIn={handleToggleCheckIn}
                now={now}
              />
            }
          />
        </Routes>
      </main>

      <Footer />

      <LoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}