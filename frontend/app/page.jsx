"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Footer } from "@/components/footer";
import { Award, Briefcase, Building2, LineChart, Plus, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const recommendations = [
    {
      company: "TechCorp Inc.",
      role: "Senior Frontend Developer",
      match: 95,
      logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop",
    },
    {
      company: "InnovateLabs",
      role: "Full Stack Engineer",
      match: 88,
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop",
    },
    {
      company: "DataFlow Systems",
      role: "React Developer",
      match: 85,
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    },
  ];

  const stats = [
    {
      title: "Active Applications",
      value: "12",
      icon: Briefcase,
    },
    {
      title: "Companies",
      value: "8",
      icon: Building2,
    },
    {
      title: "Success Rate",
      value: "68%",
      icon: LineChart,
    },
  ];

  const features = [
    {
      title: "Track Applications",
      description: "Keep all your job applications organized in one place",
      icon: Briefcase,
    },
    {
      title: "Smart Matching",
      description: "Get personalized job recommendations based on your profile",
      icon: Zap,
    },
    {
      title: "Application Analytics",
      description: "Gain insights into your application performance",
      icon: LineChart,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content: "Job Tracker helped me land my dream job! The organization tools are fantastic.",
      company: "Google",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content: "The best platform for managing job applications. Simple yet powerful.",
      company: "Microsoft",
    },
    {
      name: "Emily Davis",
      role: "UX Designer",
      content: "I love how easy it is to track my applications and get insights.",
      company: "Apple",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container space-y-8 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl">
              Track Your Job Search Journey
            </h1>
            <p className="mb-12 text-lg text-muted-foreground sm:text-xl">
              Organize your job applications, track your progress, and land your dream job
              with our powerful job application management platform.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/browse">Browse Jobs</Link>
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="container py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-muted-foreground" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="container py-16">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Job Tracker?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                      <feature.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recommendations Section */}
        <section className="container py-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Recommended Jobs
              </CardTitle>
            </CardHeader>
            <ScrollArea className="h-[400px]">
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recommendations.map((job) => (
                  <Link
                    href="#"
                    key={`${job.company}-${job.role}`}
                    className="block"
                  >
                    <Card className="transition-all hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="mb-4 flex items-center gap-4">
                          <img
                            src={job.logo}
                            alt={job.company}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <div>
                            <h3 className="font-semibold">{job.company}</h3>
                            <p className="text-sm text-muted-foreground">
                              {job.role}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            Match Score
                          </div>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-2 w-16 rounded-full bg-primary/20"
                              style={{
                                background: `linear-gradient(90deg, hsl(var(--primary)) ${job.match}%, transparent ${job.match}%)`,
                              }}
                            />
                            <span className="text-sm font-medium">
                              {job.match}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </CardContent>
            </ScrollArea>
          </Card>
        </section>

        {/* Testimonials Section */}
        <section className="container py-16">
          <h2 className="mb-12 text-center text-3xl font-bold">What Our Users Say</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <p className="mb-4 text-muted-foreground">{testimonial.content}</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
