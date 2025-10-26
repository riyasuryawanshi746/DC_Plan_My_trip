import type React from "react";
import Link from "next/link";
import { Plane, MapPin, Calendar, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { url } from "inspector";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="min-h-screen bg-no-repeat bg-cover bg-center verflow-hidden"
        style={{ backgroundImage: "url(/travel.png)" }}
      >
        <div className="container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-balance">
              Plan your perfect journey.
            </h1>
            <p className="text-xl mb-8 leading-relaxed max-w-2xl">
              Your complete toolkit to organize trips, book experiences, and
              explore destinations. Build detailed itineraries with intelligent
              planning tools.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/auth/register">Get Started</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/auth/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Calendar className="w-6 h-6" />}
              title="Itinerary Planning"
              description="Create detailed day-by-day travel plans with activities, accommodations, and transportation."
            />
            <FeatureCard
              icon={<MapPin className="w-6 h-6" />}
              title="City Explorer"
              description="Discover destinations with comprehensive city guides, attractions, and local insights."
            />
            <FeatureCard
              icon={<Plane className="w-6 h-6" />}
              title="Booking Management"
              description="Track all your reservations in one place. Flights, hotels, and activities organized."
            />
            <FeatureCard
              icon={<Bell className="w-6 h-6" />}
              title="Real-time Updates"
              description="Get instant notifications about booking confirmations, changes, and travel alerts."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border">
        <div className="container mx-auto px-6 py-24">
          <div className="grid md:grid-cols-3 gap-12">
            <StatCard
              value="10k+"
              label="Trips Planned"
              company="Active Travelers"
            />
            <StatCard
              value="150+"
              label="Cities Covered"
              company="Global Destinations"
            />
            <StatCard
              value="95%"
              label="Satisfaction Rate"
              company="User Reviews"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section>
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Start Planning
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Ready for your next adventure?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Join thousands of travelers who trust our platform for seamless
              trip planning. Create your account and start building your dream
              itinerary today.
            </p>
            <Button size="lg" asChild>
              <Link href="/auth/register">Create Free Account</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="border border-border rounded-lg p-6 bg-card hover:bg-secondary/50 transition-colors">
      <div className="mb-4 text-primary">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function StatCard({
  value,
  label,
  company,
}: {
  value: string;
  label: string;
  company: string;
}) {
  return (
    <div className="border-l border-border pl-6">
      <div className="text-4xl font-bold mb-2">{value}</div>
      <div className="text-muted-foreground mb-1">{label}</div>
      <div className="text-sm text-muted-foreground">{company}</div>
    </div>
  );
}
