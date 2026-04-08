export const spaces = [
  {
    id: 'main-library',
    name: 'Main Campus Library',
    location: 'Central Campus • 3rd Floor East',
    distanceText: '0.2 mi',
    distanceCategory: 'nearby',
    occupancy: 32,
    noise: 'Very Quiet',
    vibe: 'Silent Zone',
    type: 'Library',
    outlets: true,
    openNow: true,
    groupFriendly: false,
    features: ['Wi-Fi', 'Power outlets', 'Quiet desks'],
    hours: 'Open until 11:00 PM',
    image: 'https://picsum.photos/seed/mainlibrary/900/600',
    coordinates: { lat: 43.0766, lng: -89.4003 },
    hoursByDay: {
      0: { open: '10:00', close: '18:00' },
      1: { open: '08:00', close: '23:00' },
      2: { open: '08:00', close: '23:00' },
      3: { open: '08:00', close: '23:00' },
      4: { open: '08:00', close: '23:00' },
      5: { open: '08:00', close: '21:00' },
      6: { open: '10:00', close: '18:00' }
    },
    amenities: [
      'Power outlets at most desks',
      'High-speed campus Wi-Fi',
      'Printer nearby',
      'Coffee shop on Level 1'
    ],
    accessibility: [
      'Elevator access available',
      'Wide aisles between desks',
      'Accessible entrance on east side'
    ],
    recentActivity: [
      { text: 'Sarah M. checked in', time: '2 minutes ago' },
      { text: 'David K. checked out', time: '12 minutes ago' },
      { text: 'Alex H. reported “Quiet”', time: '15 minutes ago' }
    ]
  },
  {
    id: 'bean-post',
    name: 'The Bean Post',
    location: 'Student Union • Ground Floor',
    distanceText: '0.5 mi',
    distanceCategory: 'mid',
    occupancy: 58,
    noise: 'Moderate',
    vibe: 'Social / Background Noise',
    type: 'Cafe',
    outlets: true,
    openNow: true,
    groupFriendly: true,
    features: ['Coffee nearby', 'Power outlets', 'Casual seating'],
    hours: 'Open until 9:00 PM',
    image: 'https://picsum.photos/seed/beanpost/900/600',
    coordinates: { lat: 43.0725, lng: -89.4072 },
    hoursByDay: {
      0: { open: '11:00', close: '17:00' },
      1: { open: '07:30', close: '21:00' },
      2: { open: '07:30', close: '21:00' },
      3: { open: '07:30', close: '21:00' },
      4: { open: '07:30', close: '21:00' },
      5: { open: '07:30', close: '20:00' },
      6: { open: '10:00', close: '17:00' }
    },
    amenities: [
      'Coffee and snacks',
      'Window seating',
      'Power outlets near wall seats',
      'Shared tables for small groups'
    ],
    accessibility: [
      'Ramp entry available',
      'Accessible restrooms nearby',
      'Wheelchair-friendly tables'
    ],
    recentActivity: [
      { text: 'Priya T. checked in', time: '4 minutes ago' },
      { text: '2 students marked it as “Busy”', time: '11 minutes ago' },
      { text: 'Nina R. saved this spot', time: '17 minutes ago' }
    ]
  },
  {
    id: 'union-south',
    name: 'Student Union South',
    location: 'South Campus • Lounge Area',
    distanceText: '0.1 mi',
    distanceCategory: 'nearby',
    occupancy: 82,
    noise: 'Lively',
    vibe: 'Group Work / Active',
    type: 'Lounge',
    outlets: true,
    openNow: true,
    groupFriendly: true,
    features: ['Group seating', 'Wi-Fi', 'Open tables'],
    hours: 'Open until 12:00 AM',
    image: 'https://picsum.photos/seed/unionsouth/900/600',
    coordinates: { lat: 43.0716, lng: -89.4078 },
    hoursByDay: {
      0: { open: '09:00', close: '22:00' },
      1: { open: '07:00', close: '00:00' },
      2: { open: '07:00', close: '00:00' },
      3: { open: '07:00', close: '00:00' },
      4: { open: '07:00', close: '00:00' },
      5: { open: '07:00', close: '00:00' },
      6: { open: '09:00', close: '22:00' }
    },
    amenities: [
      'Large open seating area',
      'Fast Wi-Fi',
      'Plenty of natural light',
      'Nearby food options'
    ],
    accessibility: [
      'Elevator access',
      'Automatic main doors',
      'Accessible seating spread across the lounge'
    ],
    recentActivity: [
      { text: '4 students checked in recently', time: '3 minutes ago' },
      { text: 'Crowd level updated to High', time: '8 minutes ago' },
      { text: 'Megan L. marked it “Group Friendly”', time: '20 minutes ago' }
    ]
  },
  {
    id: 'engineering-hall-a',
    name: 'Engineering Hall A',
    location: 'Engineering Campus • Room A120',
    distanceText: '0.8 mi',
    distanceCategory: 'far',
    occupancy: 35,
    noise: 'Quiet',
    vibe: 'Quiet Study',
    type: 'Study Room',
    outlets: true,
    openNow: true,
    groupFriendly: false,
    features: ['Quiet room', 'Power outlets', 'Individual desks'],
    hours: 'Open until 10:00 PM',
    image: 'https://picsum.photos/seed/engineeringhall/900/600',
    coordinates: { lat: 43.0734, lng: -89.4115 },
    hoursByDay: {
      0: null,
      1: { open: '08:00', close: '22:00' },
      2: { open: '08:00', close: '22:00' },
      3: { open: '08:00', close: '22:00' },
      4: { open: '08:00', close: '22:00' },
      5: { open: '08:00', close: '20:00' },
      6: null
    },
    amenities: [
      'Individual desks',
      'Charging points',
      'Printer nearby',
      'Good lighting'
    ],
    accessibility: [
      'Accessible path from main entrance',
      'Elevator nearby',
      'Quiet corner seating options'
    ],
    recentActivity: [
      { text: 'Anjali P. checked in', time: '6 minutes ago' },
      { text: 'Noise reported as “Quiet”', time: '14 minutes ago' },
      { text: 'Rahul S. saved this spot', time: '26 minutes ago' }
    ]
  },
  {
    id: 'graduate-commons',
    name: 'Graduate Commons',
    location: 'North Campus • Level 4',
    distanceText: '0.4 mi',
    distanceCategory: 'mid',
    occupancy: 47,
    noise: 'Mostly Quiet',
    vibe: 'Focused Study',
    type: 'Commons',
    outlets: true,
    openNow: false,
    groupFriendly: true,
    features: ['Wi-Fi', 'Power outlets', 'Soft seating'],
    hours: 'Reopens at 8:00 AM',
    image: 'https://picsum.photos/seed/graduatecommons/900/600',
    coordinates: { lat: 43.0787, lng: -89.3989 },
    hoursByDay: {
      0: null,
      1: { open: '08:00', close: '20:00' },
      2: { open: '08:00', close: '20:00' },
      3: { open: '08:00', close: '20:00' },
      4: { open: '08:00', close: '20:00' },
      5: { open: '08:00', close: '18:00' },
      6: null
    },
    amenities: [
      'Soft seating and study tables',
      'Monitor-friendly desks',
      'Strong Wi-Fi',
      'Quiet corners'
    ],
    accessibility: [
      'Elevator access',
      'Automatic doors',
      'Accessible tables available'
    ],
    recentActivity: [
      { text: 'Olivia C. checked out', time: '5 minutes ago' },
      { text: 'Occupancy updated from recent check-ins', time: '13 minutes ago' },
      { text: 'Student feedback marked it “Accurate”', time: '19 minutes ago' }
    ]
  }
]