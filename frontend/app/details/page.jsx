"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Building2, Briefcase, Calendar } from "lucide-react";

export default function JobDetailsPage() {
  const job = {
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    type: "Full-time",
    experience: "5+ years",
    description: "We are looking for a skilled Senior Frontend Developer to join our team. The ideal candidate will have experience with React, JavaScript, and modern web technologies. This is an exciting opportunity to work in a fast-paced environment with a growing tech company.",
    requirements: [
      "5+ years of frontend development experience",
      "Proficiency in JavaScript, HTML, CSS",
      "Experience with React and Redux",
      "Familiarity with Agile methodologies",
    ],
    benefits: [
      "Health insurance",
      "Paid time off",
      "Remote work options",
    ],
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop",
  };

  return (
    <main className="container py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          {job.company}
        </div>
      </div>

      <Card className="overflow-hidden max-w-3xl mx-auto">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <img src={job.logo} alt={job.company} className="h-12 w-12 rounded-lg object-cover" />
            <div>
              <h3 className="text-xl font-semibold">{job.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {job.location}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Job Description</h4>
            <p>{job.description}</p>

            <h4 className="font-semibold">Key Requirements</h4>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              {job.requirements.map((req, idx) => (
                <li key={idx}>{req}</li>
              ))}
            </ul>

            <h4 className="font-semibold">Benefits</h4>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              {job.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary">{job.type}</Badge>
            <Badge variant="secondary">{job.experience}</Badge>
            <Badge variant="secondary">{job.salary}</Badge>
          </div>

          <div className="flex justify-between items-center">
            <Button className="w-1/2">Apply Now</Button>
            <div className="text-sm text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Apply by: March 30, 2025
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
