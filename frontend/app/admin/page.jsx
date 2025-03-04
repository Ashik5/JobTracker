"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { Check, Trash2 } from "lucide-react";

const pendingJobs = [
  { id: 1, title: "Frontend Developer", company: "TechCorp Inc." },
  { id: 2, title: "Backend Engineer", company: "CodeSolutions Ltd." },
];

const approvedJobs = [
  { id: 3, title: "UI/UX Designer", company: "Designify" },
  { id: 4, title: "Data Scientist", company: "DataWorks" },
];

export default function AdminJobManagement() {
  const [pending, setPending] = useState(pendingJobs);
  const [approved, setApproved] = useState(approvedJobs);

  const handleApprove = (jobId) => {
    const jobToApprove = pending.find((job) => job.id === jobId);
    setPending(pending.filter((job) => job.id !== jobId));
    setApproved([...approved, jobToApprove]);
  };

  const handleDelete = (jobId, isPending) => {
    if (isPending) {
      setPending(pending.filter((job) => job.id !== jobId));
    } else {
      setApproved(approved.filter((job) => job.id !== jobId));
    }
  };

  return (
    <main className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Admin Job Management</h1>
      
      {/* Pending Job Posts */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pending Job Posts</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pending.map((job) => (
            <Card key={job.id} className="p-4">
              <CardContent className="space-y-2">
                <h3 className="text-lg font-medium">{job.title}</h3>
                <p className="text-muted-foreground">{job.company}</p>
                <div className="flex gap-2">
                  <Button className="bg-white text-black border border-gray-300 hover:bg-white" onClick={() => handleApprove(job.id)}>
                    <Check className="h-4 w-4 mr-2 text-black" /> <span className="text-black">Approve</span>
                  </Button>
                  <Button className="bg-black text-white" onClick={() => handleDelete(job.id, true)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Approved Job Posts */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Approved Job Posts</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {approved.map((job) => (
            <Card key={job.id} className="p-4">
              <CardContent className="space-y-2">
                <h3 className="text-lg font-medium">{job.title}</h3>
                <p className="text-muted-foreground">{job.company}</p>
                <Button className="bg-black text-white" onClick={() => handleDelete(job.id, false)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
