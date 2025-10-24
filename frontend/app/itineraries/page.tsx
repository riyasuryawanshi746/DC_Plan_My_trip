"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockItineraries } from "@/lib/mock-data"
import type { Itinerary } from "@/lib/types"

export default function ItinerariesPage() {
  const [itineraries] = useState<Itinerary[]>(mockItineraries)

  const formatDateRange = (start: Date, end: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric", year: "numeric" }
    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`
  }

  const getDuration = (start: Date, end: Date) => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return `${days} ${days === 1 ? "day" : "days"}`
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Your Itineraries</h1>
              <p className="text-muted-foreground">Plan and manage your travel adventures</p>
            </div>
            <Button asChild>
              <Link href="/itineraries/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Itinerary
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {itineraries.length === 0 ? (
          <div className="text-center py-24">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No itineraries yet</h2>
            <p className="text-muted-foreground mb-6">Start planning your first trip</p>
            <Button asChild>
              <Link href="/itineraries/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Itinerary
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {itineraries.map((itinerary) => (
              <Link key={itinerary.id} href={`/itineraries/${itinerary.id}`}>
                <Card className="h-full hover:bg-secondary/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-xl">{itinerary.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {itinerary.destination}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDateRange(itinerary.startDate, itinerary.endDate)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {getDuration(itinerary.startDate, itinerary.endDate)}
                      </div>
                      {itinerary.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">{itinerary.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
