"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

export default function JobApplicationForm() {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <main className="container py-6">
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Apply for Jobs</h1>
      </div>

      <Card className="max-w-xl mx-auto">
        <CardContent className="p-6a space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" placeholder="Enter your full name" />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="Enter your phone number" />
          </div>
          <div>
            <Label>Upload Resume</Label>
            <div className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
              <UploadCloud className="h-5 w-5 text-muted-foreground" />
              <input type="file" accept=".pdf" className="hidden" id="resume" onChange={handleFileChange} />
              <label htmlFor="resume" className="cursor-pointer text-sm">
                {fileName || "Choose a file"}
              </label>
            </div>
          </div>
          <div>
            <Label>Upload Cover letter</Label>
            <div className="flex items-center gap-2 border p-2 rounded-md cursor-pointer">
              <UploadCloud className="h-5 w-5 text-muted-foreground" />
              <input type="file" accept=".pdf" className="hidden" id="resume" onChange={handleFileChange} />
              <label htmlFor="resume" className="cursor-pointer text-sm">
                {fileName || "Choose a file"}
              </label>
            </div>
          </div>
          <Button className="w-full">Submit Application</Button>
        </CardContent>
      </Card>
    </main>
  );
}
