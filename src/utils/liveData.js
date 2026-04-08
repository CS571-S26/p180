function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function timeToMinutes(value) {
  if (value === '00:00') return 24 * 60
  const [hours, minutes] = value.split(':').map(Number)
  return hours * 60 + minutes
}

function formatClock(value) {
  const [rawHours, rawMinutes] = value.split(':').map(Number)
  const hours = rawHours % 24
  const suffix = hours >= 12 ? 'PM' : 'AM'
  const displayHour = hours % 12 === 0 ? 12 : hours % 12
  return `${displayHour}:${String(rawMinutes).padStart(2, '0')} ${suffix}`
}

export function getTodaySchedule(space, now = new Date()) {
  return space.hoursByDay?.[now.getDay()] ?? null
}

export function isSpaceOpenNow(space, now = new Date()) {
  const schedule = getTodaySchedule(space, now)
  if (!schedule) return false

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const openMinutes = timeToMinutes(schedule.open)
  const closeMinutes = timeToMinutes(schedule.close)

  return currentMinutes >= openMinutes && currentMinutes < closeMinutes
}

export function getHoursLabel(space, now = new Date()) {
  const schedule = getTodaySchedule(space, now)
  if (!schedule) return 'Closed today'

  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  const openMinutes = timeToMinutes(schedule.open)
  const closeMinutes = timeToMinutes(schedule.close)

  if (currentMinutes < openMinutes) {
    return `Opens at ${formatClock(schedule.open)}`
  }

  if (currentMinutes < closeMinutes) {
    return `Open until ${formatClock(schedule.close)}`
  }

  return 'Closed for today'
}

export function haversineMiles(lat1, lon1, lat2, lon2) {
  const toRadians = (value) => (value * Math.PI) / 180
  const earthRadiusMiles = 3958.8

  const dLat = toRadians(lat2 - lat1)
  const dLon = toRadians(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return earthRadiusMiles * c
}

export function getDistanceMiles(space, userLocation) {
  if (!userLocation || !space.coordinates) return null

  return haversineMiles(
    userLocation.lat,
    userLocation.lng,
    space.coordinates.lat,
    space.coordinates.lng
  )
}

export function getDistanceText(space, userLocation) {
  const miles = getDistanceMiles(space, userLocation)
  if (miles === null) return space.distanceText
  return `${miles.toFixed(1)} mi`
}

export function getDistanceCategory(space, userLocation) {
  const miles = getDistanceMiles(space, userLocation)
  if (miles === null) return space.distanceCategory

  if (miles <= 0.3) return 'nearby'
  if (miles <= 0.8) return 'mid'
  return 'far'
}

export function timeAgo(isoString, now = new Date()) {
  const diffMs = now - new Date(isoString)
  const minutes = Math.floor(diffMs / 60000)

  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`

  const hours = Math.floor(minutes / 60)
  return `${hours} hour${hours === 1 ? '' : 's'} ago`
}

export function buildActivityFeed(space, events, now = new Date()) {
  const localEvents = events
    .filter((event) => event.spaceId === space.id)
    .map((event) => ({
      text: `You ${event.action}`,
      time: timeAgo(event.createdAt, now)
    }))

  return [...localEvents, ...space.recentActivity].slice(0, 5)
}

export function getLiveOccupancy(baseOccupancy, events, isCheckedIn, now = new Date()) {
  const recentEvents = events.filter((event) => {
    const ageMs = now - new Date(event.createdAt)
    return ageMs <= 90 * 60 * 1000
  })

  const change = recentEvents.reduce((total, event) => {
    return total + (event.action === 'checked in' ? 6 : -4)
  }, 0)

  return clamp(baseOccupancy + change + (isCheckedIn ? 3 : 0), 5, 98)
}

export function buildMapEmbedUrl(coordinates) {
  if (!coordinates) return ''

  const { lat, lng } = coordinates
  const delta = 0.005

  const bbox = [
    lng - delta,
    lat - delta,
    lng + delta,
    lat + delta
  ]
    .map((value) => encodeURIComponent(value))
    .join('%2C')

  const marker = `${encodeURIComponent(lat)}%2C${encodeURIComponent(lng)}`

  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`
}