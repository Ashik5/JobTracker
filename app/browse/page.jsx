"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, MapPin, Search } from "lucide-react";
import { useState } from "react";

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    type: "Full-time",
    experience: "5+ years",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop",
  },
  // Add more job listings...
];

export default function BrowsePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [salaryRange, setSalaryRange] = useState([50, 200]);

  return (
    <main className="container py-6">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Browse Jobs</h1>
        <div className="grid gap-4 md:grid-cols-[2fr,1fr,1fr,auto]">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs or companies..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Job Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Experience Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-4">
                <img
                  src={job.logo}
                  alt={job.company}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-3 w-3" />
                    {job.company}
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  {job.location}
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{job.type}</Badge>
                  <Badge variant="secondary">{job.experience}</Badge>
                  <Badge variant="secondary">{job.salary}</Badge>
                </div>
                <Button className="mt-4 w-full">Apply Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}