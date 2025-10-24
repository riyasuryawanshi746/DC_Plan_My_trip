"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, MapPin, Thermometer, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCities } from "@/lib/mock-data"
import type { City } from "@/lib/types"

export default function CitiesPage() {
  const [cities] = useState<City[]>(mockCities)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCities = cities.filter(
    (city) =>
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold mb-2">Explore Cities</h1>
          <p className="text-muted-foreground mb-8">Discover your next destination</p>

          <div className="max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search cities, countries, or attractions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {filteredCities.length === 0 ? (
          <div className="text-center py-24">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-semibold mb-2">No cities found</h2>
            <p className="text-muted-foreground">Try adjusting your search</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCities.map((city) => (
              <Link key={city.id} href={`/cities/${city.id}`}>
                <Card className="h-full hover:bg-secondary/50 transition-colors cursor-pointer overflow-hidden">
                  <div className="aspect-video relative overflow-hidden bg-muted">
                    <img
                      src={city.imageUrl || `/placeholder.svg?height=300&width=400&query=${city.name}`}
                      alt={city.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl">{city.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {city.country}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{city.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-xs">Best: {city.bestTimeToVisit}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Thermometer className="w-4 h-4" />
                        <span className="text-xs">{city.averageTemperature}</span>
                      </div>
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
