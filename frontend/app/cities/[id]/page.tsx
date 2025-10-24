"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, MapPin, Calendar, Thermometer, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockCities } from "@/lib/mock-data"

export default function CityDetailPage() {
  const params = useParams()
  const [city] = useState(mockCities.find((c) => c.id === params.id))

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">City not found</h2>
          <Button asChild>
            <Link href="/cities">Back to Cities</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-8">
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/cities">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cities
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="aspect-[21/9] relative overflow-hidden bg-muted border-b border-border">
        <img
          src={city.imageUrl || `/placeholder.svg?height=600&width=1400&query=${city.name} skyline`}
          alt={city.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container mx-auto px-6 py-12">
            <h1 className="text-5xl font-bold mb-2">{city.name}</h1>
            <p className="text-xl text-muted-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              {city.country}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">About {city.name}</h2>
              <p className="text-muted-foreground leading-relaxed">{city.description}</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Top Attractions</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {city.attractions.map((attraction, index) => (
                  <Card key={index} className="hover:bg-secondary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Star className="w-5 h-5 text-primary" />
                        {attraction}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Travel Tips</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      Best Time to Visit
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{city.bestTimeToVisit}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Thermometer className="w-5 h-5 text-primary" />
                      Average Temperature
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{city.averageTemperature}</p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Plan Your Trip</CardTitle>
                <CardDescription>Start creating your itinerary to {city.name}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link href="/itineraries/create">Create Itinerary</Link>
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/bookings/create">Add Booking</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Facts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <Badge variant="outline">{city.country}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Attractions</span>
                  <Badge variant="outline">{city.attractions.length}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Climate</span>
                  <Badge variant="outline">{city.averageTemperature}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Sightseeing</Badge>
                  <Badge variant="secondary">Food Tours</Badge>
                  <Badge variant="secondary">Museums</Badge>
                  <Badge variant="secondary">Shopping</Badge>
                  <Badge variant="secondary">Nightlife</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
