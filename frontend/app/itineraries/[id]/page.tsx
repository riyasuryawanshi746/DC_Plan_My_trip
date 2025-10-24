"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Calendar, MapPin, Clock, Plus, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockItineraries } from "@/lib/mock-data"
import type { Activity } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"

export default function ItineraryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [itinerary] = useState(mockItineraries.find((i) => i.id === params.id))

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Itinerary not found</h2>
          <Button asChild>
            <Link href="/itineraries">Back to Itineraries</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formatDateRange = (start: Date, end: Date) => {
    const options: Intl.DateTimeFormatOptions = { month: "long", day: "numeric", year: "numeric" }
    return `${start.toLocaleDateString("en-US", options)} - ${end.toLocaleDateString("en-US", options)}`
  }

  const getDuration = (start: Date, end: Date) => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return `${days} ${days === 1 ? "day" : "days"}`
  }

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "accommodation":
        return "🏨"
      case "transport":
        return "✈️"
      case "dining":
        return "🍽️"
      case "activity":
        return "🎯"
      default:
        return "📍"
    }
  }

  const handleDelete = () => {
    toast({
      title: "Itinerary deleted",
      description: "Your travel plan has been removed",
    })
    router.push("/itineraries")
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/itineraries">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Itineraries
            </Link>
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{itinerary.title}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {itinerary.destination}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDateRange(itinerary.startDate, itinerary.endDate)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {getDuration(itinerary.startDate, itinerary.endDate)}
                </div>
              </div>
              {itinerary.description && <p className="mt-4 text-muted-foreground">{itinerary.description}</p>}
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" size="sm" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Daily Schedule</h2>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Day
            </Button>
          </div>

          {itinerary.days.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No days planned yet</h3>
                <p className="text-muted-foreground mb-4">Start adding activities to your itinerary</p>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Day
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {itinerary.days.map((day) => (
                <Card key={day.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Day {day.dayNumber}</CardTitle>
                        <CardDescription>
                          {day.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Activity
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {day.activities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex gap-4 p-4 border border-border rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <h4 className="font-semibold">{activity.title}</h4>
                                {activity.location && (
                                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {activity.location}
                                  </p>
                                )}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {activity.time}
                              </Badge>
                            </div>
                            {activity.description && (
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
