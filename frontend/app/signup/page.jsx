"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  role: z.enum(["user", "company"], {
    required_error: "Please select a role.",
  }),
  phoneNumber: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  expertises: z.array(z.string()).min(1, {
    message: "Please enter at least one area of expertise.",
  }),
  currentProfession: z.string().min(2, {
    message: "Please enter your current profession.",
  }),
});



export default function SignUpPage() {
  const [expertiseInput, setExpertiseInput] = useState("");
  const [userData, setUserData] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const tempData = localStorage.getItem('tempUserData');
    if (tempData) {
      const parsedData = JSON.parse(tempData);
      setUserData(parsedData);
      form.setValue('name', parsedData.name || '');
      form.setValue('email', parsedData.email || '');
      if (parsedData.role) {
        form.setValue('role', parsedData.role === 'company' ? 'company' : 'job_seeker');
      }
    }
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      expertises: [],
      currentProfession: "",
    },
  });

  const handleExpertiseKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const expertise = expertiseInput.trim();
      if (expertise) {
        const currentExpertises = form.getValues().expertises || [];
        if (!currentExpertises.includes(expertise)) {
          form.setValue('expertises', [...currentExpertises, expertise]);
        }
        setExpertiseInput("");
      }
    }
  };

  const removeExpertise = (indexToRemove) => {
    const currentExpertises = form.getValues().expertises;
    form.setValue(
      'expertises',
      currentExpertises.filter((_, index) => index !== indexToRemove)
    );
  };

  async function onSubmit(values) {
    try {
      const response = await fetch('http://localhost:3001/users/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          auth0Id: userData.auth0Id,
          name: values.name,
          picture: userData.picture,
          role: values.role,
          phone_number: values.phoneNumber,
          profession: values.currentProfession,
          expertise: values.expertises
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create user');
      }
  
      const data = await response.json();
      console.log('User created successfully:', data);
      router.push('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Role Selection */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>I am a</FormLabel>
                    <FormControl>
                      <div className="flex gap-4">
                        {["user", "company"].map((role) => (
                          <Button
                            key={role}
                            type="button"
                            variant={field.value === role ? "default" : "outline"}
                            className={`w-full h-12 ${
                              field.value === role ? "ring-2 ring-primary" : "hover:bg-secondary"
                            }`}
                            onClick={() => field.onChange(role)}
                          >
                            {role === "user" ? "Job Seeker" : "Company"}
                          </Button>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Input Fields */}
              {[
                { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
                { label: "Email", name: "email", type: "email", placeholder: "john@example.com" },
                { label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "+1 (555) 000-0000" },
                { label: "Current Profession", name: "currentProfession", type: "text", placeholder: "Software Engineer" },
              ].map(({ label, name, type, placeholder }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input type={type} placeholder={placeholder} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              {/* Expertise Field */}
              <FormField
                control={form.control}
                name="expertises"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Areas of Expertise</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <Input
                          type="text"
                          placeholder="Type and press Enter or comma to add expertise"
                          value={expertiseInput}
                          onChange={(e) => setExpertiseInput(e.target.value)}
                          onKeyDown={handleExpertiseKeyDown}
                        />
                        <div className="flex flex-wrap gap-2">
                          {field.value.map((expertise, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm"
                            >
                              <span>{expertise}</span>
                              <button
                                type="button"
                                onClick={() => removeExpertise(index)}
                                className="text-primary hover:text-primary/80"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Press Enter or comma to add multiple areas of expertise
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}