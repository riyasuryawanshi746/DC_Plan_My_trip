import type { Itinerary, Booking, City, Notification } from "./types"

export const mockItineraries: Itinerary[] = [
  {
    id: "1",
    userId: "1",
    title: "Tokyo Adventure",
    destination: "Tokyo, Japan",
    startDate: new Date("2025-06-15"),
    endDate: new Date("2025-06-22"),
    description: "Exploring the vibrant culture and cuisine of Tokyo",
    days: [
      {
        id: "1",
        dayNumber: 1,
        date: new Date("2025-06-15"),
        activities: [
          {
            id: "1",
            time: "09:00",
            title: "Arrive at Narita Airport",
            type: "transport",
            location: "Narita International Airport",
          },
          {
            id: "2",
            time: "14:00",
            title: "Check-in at Hotel",
            type: "accommodation",
            location: "Shibuya District",
          },
          {
            id: "3",
            time: "18:00",
            title: "Dinner at Ichiran Ramen",
            type: "dining",
            location: "Shibuya",
          },
        ],
      },
    ],
    createdAt: new Date("2025-03-01"),
    updatedAt: new Date("2025-03-15"),
  },
  {
    id: "2",
    userId: "1",
    title: "Paris Getaway",
    destination: "Paris, France",
    startDate: new Date("2025-09-10"),
    endDate: new Date("2025-09-17"),
    description: "Romantic week in the City of Light",
    days: [],
    createdAt: new Date("2025-02-20"),
    updatedAt: new Date("2025-03-10"),
  },
]

export const mockBookings: Booking[] = [
  {
    id: "1",
    userId: "1",
    itineraryId: "1",
    type: "flight",
    title: "Flight to Tokyo",
    confirmationNumber: "ABC123XYZ",
    date: new Date("2025-06-15"),
    status: "confirmed",
    details: {
      airline: "Japan Airlines",
      flightNumber: "JL005",
      departure: "JFK",
      arrival: "NRT",
    },
    createdAt: new Date("2025-03-01"),
  },
  {
    id: "2",
    userId: "1",
    itineraryId: "1",
    type: "hotel",
    title: "Hotel in Shibuya",
    confirmationNumber: "HTL456DEF",
    date: new Date("2025-06-15"),
    status: "confirmed",
    details: {
      hotelName: "Shibuya Excel Hotel",
      nights: 7,
      roomType: "Deluxe Double",
    },
    createdAt: new Date("2025-03-05"),
  },
]

export const mockCities: City[] = [
  {
    id: "1",
    name: "Tokyo",
    country: "Japan",
    description: "A bustling metropolis blending traditional culture with cutting-edge technology.",
    imageUrl: "/tokyo-skyline.png",
    attractions: ["Senso-ji Temple", "Tokyo Skytree", "Shibuya Crossing", "Meiji Shrine"],
    bestTimeToVisit: "March-May, September-November",
    averageTemperature: "16°C (61°F)",
  },
  {
    id: "2",
    name: "Paris",
    country: "France",
    description: "The romantic capital known for art, fashion, and iconic landmarks.",
    imageUrl: "/paris-eiffel-tower.png",
    attractions: ["Eiffel Tower", "Louvre Museum", "Notre-Dame", "Arc de Triomphe"],
    bestTimeToVisit: "April-June, September-October",
    averageTemperature: "12°C (54°F)",
  },
  {
    id: "3",
    name: "New York",
    country: "United States",
    description: "The city that never sleeps, offering world-class culture and entertainment.",
    imageUrl: "/nyc-skyline.png",
    attractions: ["Statue of Liberty", "Central Park", "Times Square", "Empire State Building"],
    bestTimeToVisit: "April-June, September-November",
    averageTemperature: "13°C (55°F)",
  },
]

export const mockNotifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    type: "booking",
    title: "Booking Confirmed",
    message: "Your flight to Tokyo has been confirmed. Confirmation: ABC123XYZ",
    read: false,
    createdAt: new Date("2025-03-20"),
  },
  {
    id: "2",
    userId: "1",
    type: "reminder",
    title: "Trip Reminder",
    message: "Your Tokyo trip starts in 30 days. Time to finalize your plans!",
    read: false,
    createdAt: new Date("2025-03-18"),
  },
]
