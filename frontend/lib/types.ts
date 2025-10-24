export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

export interface Itinerary {
  id: string
  userId: string
  title: string
  destination: string
  startDate: Date
  endDate: Date
  description?: string
  days: ItineraryDay[]
  createdAt: Date
  updatedAt: Date
}

export interface ItineraryDay {
  id: string
  dayNumber: number
  date: Date
  activities: Activity[]
}

export interface Activity {
  id: string
  time: string
  title: string
  description?: string
  location?: string
  type: "accommodation" | "transport" | "activity" | "dining" | "other"
}

export interface Booking {
  id: string
  userId: string
  itineraryId?: string
  type: "flight" | "hotel" | "activity" | "transport"
  title: string
  confirmationNumber: string
  date: Date
  status: "confirmed" | "pending" | "cancelled"
  details: Record<string, any>
  createdAt: Date
}

export interface City {
  id: string
  name: string
  country: string
  description: string
  imageUrl: string
  attractions: string[]
  bestTimeToVisit: string
  averageTemperature: string
}

export interface Notification {
  id: string
  userId: string
  type: "booking" | "itinerary" | "alert" | "reminder"
  title: string
  message: string
  read: boolean
  createdAt: Date
}
