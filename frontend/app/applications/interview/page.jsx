"use client";

import { Calendar, Clock, MapPin, FileText, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function InterviewDetailsPage() {
  const interview = {
    jobTitle: "Frontend Developer",
    company: "TechCorp Inc.",
    date: "March 15, 2025",
    time: "10:00 AM",
    location: "TechCorp HQ, Dhaka, Bangladesh",
    mode: "In-person",
    requiredDocuments: ["Resume", "National ID Card", "Portfolio"],
    additionalNotes:
      "Be prepared to discuss previous projects and problem-solving approaches. Dress formally.",
  };

  return (
    <main className="container py-6">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Interview Details</h1>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-4">
          <div className="text-lg font-semibold">{interview.jobTitle} Interview</div>
          <div className="text-muted-foreground">{interview.company}</div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>{interview.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <span>{interview.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <span>{interview.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge>{interview.mode}</Badge>
          </div>

          <div>
            <h2 className="text-md font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" /> Required Documents
            </h2>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {interview.requiredDocuments.map((doc, index) => (
                <li key={index}>{doc}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-md font-semibold flex items-center gap-2">
              <Info className="h-5 w-5" /> Additional Notes
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">{interview.additionalNotes}</p>
          </div>

          <Button className="w-full">Confirm Attendance</Button>
        </CardContent>
      </Card>
    </main>
  );
}
