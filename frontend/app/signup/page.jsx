"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["user", "company"], { required_error: "Please select a role." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  expertises: z.array(z.string()).min(1, { message: "Please enter at least one area of expertise." }),
  currentProfession: z.string().min(2, { message: "Please enter your current profession." }),
  profilePicture: z.any().optional(),
});

export default function SignUpPage() {
  const [expertiseInput, setExpertiseInput] = useState("");
  const [userData, setUserData] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
      expertises: [],
      currentProfession: "",
      role: "user",
      profilePicture: null,
    },
  });


  const handleExpertiseKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const expertise = expertiseInput.trim();
      if (expertise) {
        const currentExpertises = form.getValues().expertises || [];
        if (!currentExpertises.includes(expertise)) {
          form.setValue("expertises", [...currentExpertises, expertise]);
        }
        setExpertiseInput("");
      }
    }
  };

  const removeExpertise = (indexToRemove) => {
    const currentExpertises = form.getValues().expertises;
    form.setValue(
      "expertises",
      currentExpertises.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue('profilePicture', file);
      setProfilePreview(URL.createObjectURL(file));
    }
  };

  async function onSubmit(values) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('name', values.name);
      formData.append('password', values.password);
      formData.append('role', values.role);
      formData.append('phone_number', values.phoneNumber);
      formData.append('profession', values.currentProfession);
      
      // Append expertises
      values.expertises.forEach(expertise => {
        formData.append('expertise', expertise);
      });

      // Append profile picture if exists
      if (values.profilePicture) {
        formData.append('picture', values.profilePicture);
      }

      const response = await fetch("http://localhost:3001/users/register", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to create user");
      }

      alert("User created successfully");
      localStorage.setItem("user", JSON.stringify(responseData.user));
      router.push("/");
    } catch (error) {
      console.error("Error creating user:", error);
      alert(error.message || "Failed to create user");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Profile Picture Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {profilePreview && (
              <div className="mt-2 flex justify-center">
                <img
                  src={profilePreview}
                  alt="Profile preview"
                  className="w-32 h-32 object-cover rounded-full"
                />
              </div>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              I am a
            </label>
            <div className="flex gap-4">
              {["user", "company"].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`w-full py-2 rounded-md ${
                    form.watch("role") === role 
                      ? "bg-blue-500 text-white" 
                      : "bg-gray-200 text-gray-700"
                  }`}
                  onClick={() => form.setValue("role", role)}
                >
                  {role === "user" ? "Job Seeker" : "Company"}
                </button>
              ))}
            </div>
            {form.formState.errors.role && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.role.message}
              </p>
            )}
          </div>

          {/* Input Fields */}
          {[ 
            { label: "Full Name", name: "name", type: "text", placeholder: "John Doe" },
            { label: "Email", name: "email", type: "email", placeholder: "john@example.com" },
            { label: "Password", name: "password", type: "password", placeholder: "••••••••" },
            { label: "Phone Number", name: "phoneNumber", type: "tel", placeholder: "+1 (555) 000-0000" },
            { label: "Current Profession", name: "currentProfession", type: "text", placeholder: "Software Engineer" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {label}
              </label>
              <input
                type={type}
                placeholder={placeholder}
                {...form.register(name)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {form.formState.errors[name] && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors[name].message}
                </p>
              )}
            </div>
          ))}

          {/* Expertise Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Areas of Expertise
            </label>
            <input
              type="text"
              placeholder="Type and press Enter or comma to add expertise"
              value={expertiseInput}
              onChange={(e) => setExpertiseInput(e.target.value)}
              onKeyDown={handleExpertiseKeyDown}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {form.watch("expertises").map((expertise, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  <span>{expertise}</span>
                  <button
                    type="button"
                    onClick={() => removeExpertise(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            {form.formState.errors.expertises && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.expertises.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
