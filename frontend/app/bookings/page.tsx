"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Plus, Plane, Hotel, MapPin, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockBookings } from "@/lib/mock-data"
import type { Booking } from "@/lib/types"

export default function BookingsPage() {
  const [bookings] = useState<Booking[]>(mockBookings)

  const getBookingIcon = (type: Booking["type"]) => {
    switch (type) {
      case "flight":
        return <Plane className="w-5 h-5" />
      case "hotel":
        return <Hotel className="w-5 h-5" />
      case "activity":
        return <MapPin className="w-5 h-5" />
      case "transport":
        return <Calendar className="w-5 h-5" />
      default:
        return <Calendar className="w-5 h-5" />
    }
  }

  const getStatusIcon = (status: Booking["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "cancelled":
        return <XCircle className="w-4 h-4 text-red-500" />
    }
  }

  const getStatusVariant = (status: Booking["status"]): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
    }
  }

  const filterBookings = (status?: Booking["status"]) => {
    if (!status) return bookings
    return bookings.filter((b) => b.status === status)
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Bookings</h1>
              <p className="text-muted-foreground">Manage all your travel reservations</p>
            </div>
            <Button asChild>
              <Link href="/bookings/create">
                <Plus className="w-4 h-4 mr-2" />
                Add Booking
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="all">All Bookings</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <BookingsList
              bookings={bookings}
              getBookingIcon={getBookingIcon}
              getStatusIcon={getStatusIcon}
              getStatusVariant={getStatusVariant}
            />
          </TabsContent>

          <TabsContent value="confirmed">
            <BookingsList
              bookings={filterBookings("confirmed")}
              getBookingIcon={getBookingIcon}
              getStatusIcon={getStatusIcon}
              getStatusVariant={getStatusVariant}
            />
          </TabsContent>

          <TabsContent value="pending">
            <BookingsList
              bookings={filterBookings("pending")}
              getBookingIcon={getBookingIcon}
              getStatusIcon={getStatusIcon}
              getStatusVariant={getStatusVariant}
            />
          </TabsContent>

          <TabsContent value="cancelled">
            <BookingsList
              bookings={filterBookings("cancelled")}
              getBookingIcon={getBookingIcon}
              getStatusIcon={getStatusIcon}
              getStatusVariant={getStatusVariant}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BookingsList({
  bookings,
  getBookingIcon,
  getStatusIcon,
  getStatusVariant,
}: {
  bookings: Booking[]
  getBookingIcon: (type: Booking["type"]) => React.ReactNode
  getStatusIcon: (status: Booking["status"]) => React.ReactNode
  getStatusVariant: (status: Booking["status"]) => "default" | "secondary" | "destructive"
}) {
  if (bookings.length === 0) {
    return (
      <div className="text-center py-24">
        <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
        <h2 className="text-2xl font-semibold mb-2">No bookings found</h2>
        <p className="text-muted-foreground mb-6">Start adding your travel reservations</p>
        <Button asChild>
          <Link href="/bookings/create">
            <Plus className="w-4 h-4 mr-2" />
            Add Your First Booking
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {bookings.map((booking) => (
        <Card key={booking.id} className="hover:bg-secondary/50 transition-colors">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="text-primary">{getBookingIcon(booking.type)}</div>
                <div>
                  <CardTitle className="text-lg">{booking.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs capitalize">
                      {booking.type}
                    </Badge>
                    <span className="flex items-center gap-1">
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </span>
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Confirmation</span>
                <span className="font-mono font-semibold">{booking.confirmationNumber}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Date</span>
                <span>
                  {booking.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>

              {booking.type === "flight" && booking.details && (
                <div className="pt-3 border-t border-border space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Airline</span>
                    <span>{booking.details.airline}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Flight</span>
                    <span className="font-mono">{booking.details.flightNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Route</span>
                    <span>
                      {booking.details.departure} → {booking.details.arrival}
                    </span>
                  </div>
                </div>
              )}

              {booking.type === "hotel" && booking.details && (
                <div className="pt-3 border-t border-border space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Hotel</span>
                    <span>{booking.details.hotelName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Room</span>
                    <span>{booking.details.roomType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Nights</span>
                    <span>{booking.details.nights}</span>
                  </div>
                </div>
              )}

              <div className="pt-3 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
