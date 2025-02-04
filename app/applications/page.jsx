"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building2,
  Calendar,
  Clock,
} from "lucide-react";

const applications = [
  {
    id: 1,
    role: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    status: "interview",
    appliedDate: "2024-03-15",
    nextStep: "Technical Interview on March 20",
    logo: "https://images.unsplash.com/photo-1549924231-f129b911e442?w=200&h=200&fit=crop",
  },
];

const statusColors = {
  applied: "bg-blue-500",
  interview: "bg-yellow-500",
  offer: "bg-green-500",
  rejected: "bg-red-500",
};

export default function ApplicationsPage() {
  return (
    <main className="container py-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Applications</h1>
          <p className="text-muted-foreground">
            Track and manage your job applications
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interview">Interview</SelectItem>
              <SelectItem value="offer">Offer</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <img
                  src={app.logo}
                  alt={app.company}
                  className="h-12 w-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <CardTitle>{app.role}</CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    {app.company}
                  </CardDescription>
                </div>
                <Badge
                  className={`${statusColors[app.status]} text-white`}
                >
                  {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    Applied on {app.appliedDate}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {app.nextStep}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Add Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="archived">
          <Card>
            <CardHeader>
              <CardTitle>No archived applications</CardTitle>
              <CardDescription>
                Applications you archive will appear here
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
}
