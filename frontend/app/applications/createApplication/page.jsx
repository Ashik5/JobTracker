"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function CreateJobPost() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Skills and benefits input state
  const [skillInput, setSkillInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    salary_range_start: "",
    salary_range_end: "",
    job_type: "full-time",
    location: "",
    is_remote: false,
    experience_level: "mid",
    skills_required: [],
    benefits: [],
    application_deadline: "",
    status: "draft",
    created_by: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const manualUserId = JSON.parse(storedUser); // Parse the JSON string into an object
      console.log(manualUserId); // Check the full object in the console

      setFormData((prevFormData) => ({
        ...prevFormData,
        created_by: manualUserId.id, // Access the correct `id` property
      }));
    }
  }, []);
  console.log(formData);

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  // Handle skills input
  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };

  // Handle benefits input
  const handleBenefitInputChange = (e) => {
    setBenefitInput(e.target.value);
  };

  // Add skill
  const addSkill = (e) => {
    e.preventDefault();
    if (skillInput.trim()) {
      setFormData({
        ...formData,
        skills_required: [...formData.skills_required, skillInput.trim()],
      });
      setSkillInput("");
    }
  };

  // Add benefit
  const addBenefit = (e) => {
    e.preventDefault();
    if (benefitInput.trim()) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, benefitInput.trim()],
      });
      setBenefitInput("");
    }
  };

  // Remove item from array
  const removeArrayItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const preparedData = {
      ...formData,
      // Don't stringify these arrays - send them as is
      skills_required: formData.skills_required,
      benefits: formData.benefits,
      // Ensure salary fields are numbers
      salary_range_start: formData.salary_range_start
        ? Number(formData.salary_range_start)
        : null,
      salary_range_end: formData.salary_range_end
        ? Number(formData.salary_range_end)
        : null,
    };

    try {
      const response = await fetch("http://localhost:3001/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preparedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create job post");
      }

      const data = await response.json();

      // Redirect to the job post page
      router.push(`/applications/createApplication`);
    } catch (error) {
      console.error("Error creating job post:", error);
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Head>
        <title>Create Job Post</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">Create New Job Post</h1>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info Section */}
        <div className="shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="space-y-4">
            {/* Job Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Job Title*
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              />
            </div>

            {/* Job Type */}
            <div>
              <label
                htmlFor="job_type"
                className="block text-sm font-medium text-gray-700"
              >
                Job Type*
              </label>
              <select
                id="job_type"
                name="job_type"
                required
                value={formData.job_type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            {/* Experience Level */}
            <div>
              <label
                htmlFor="experience_level"
                className="block text-sm font-medium text-gray-700"
              >
                Experience Level*
              </label>
              <select
                id="experience_level"
                name="experience_level"
                required
                value={formData.experience_level}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="lead">Lead/Management</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="closed">Closed</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Location</h2>

          <div className="space-y-4">
            {/* Location */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location*
              </label>
              <input
                type="text"
                id="location"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
                placeholder="City, State, Country"
              />
            </div>

            {/* Remote Option */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_remote"
                name="is_remote"
                checked={formData.is_remote}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="is_remote"
                className="ml-2 block text-sm text-gray-700"
              >
                This is a remote position
              </label>
            </div>
          </div>
        </div>

        {/* Salary Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Compensation</h2>

          <div className="grid grid-cols-2 gap-4">
            {/* Salary Range Start */}
            <div>
              <label
                htmlFor="salary_range_start"
                className="block text-sm font-medium text-gray-700"
              >
                Salary Range (Start)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="salary_range_start"
                  name="salary_range_start"
                  value={formData.salary_range_start}
                  onChange={handleChange}
                  className="block w-full pl-7 pr-12 border border-gray-300 rounded-md p-2 bg-white"
                  placeholder="0.00"
                  step="1000"
                />
              </div>
            </div>

            {/* Salary Range End */}
            <div>
              <label
                htmlFor="salary_range_end"
                className="block text-sm font-medium text-gray-700"
              >
                Salary Range (End)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="salary_range_end"
                  name="salary_range_end"
                  value={formData.salary_range_end}
                  onChange={handleChange}
                  className="block w-full pl-7 pr-12 border border-gray-300 rounded-md p-2 bg-white"
                  placeholder="0.00"
                  step="1000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Job Description Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Job Details</h2>

          <div className="space-y-4">
            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Job Description*
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleChange}
                rows="6"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
                placeholder="Provide a detailed description of the job..."
              ></textarea>
            </div>

            {/* Requirements */}
            <div>
              <label
                htmlFor="requirements"
                className="block text-sm font-medium text-gray-700"
              >
                Job Requirements*
              </label>
              <textarea
                id="requirements"
                name="requirements"
                required
                value={formData.requirements}
                onChange={handleChange}
                rows="6"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
                placeholder="List qualifications and requirements..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Skills & Benefits</h2>

          <div className="space-y-6">
            {/* Skills Required */}
            <div>
              <label
                htmlFor="skills"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Skills Required
              </label>

              <div className="flex mb-2">
                <input
                  type="text"
                  id="skill-input"
                  value={skillInput}
                  onChange={handleSkillInputChange}
                  className="flex-grow border border-gray-300 rounded-l-md shadow-sm p-2 bg-white"
                  placeholder="Add a skill..."
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData.skills_required.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("skills_required", index)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div>
              <label
                htmlFor="benefits"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Benefits
              </label>

              <div className="flex mb-2">
                <input
                  type="text"
                  id="benefit-input"
                  value={benefitInput}
                  onChange={handleBenefitInputChange}
                  className="flex-grow border border-gray-300 rounded-l-md shadow-sm p-2 bg-white"
                  placeholder="Add a benefit..."
                />
                <button
                  type="button"
                  onClick={addBenefit}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {formData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeArrayItem("benefits", index)}
                      className="ml-2 text-green-600 hover:text-green-800"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Deadline Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Application Deadline</h2>

          <div>
            <label
              htmlFor="application_deadline"
              className="block text-sm font-medium text-gray-700"
            >
              Application Deadline
            </label>
            <input
              type="date"
              id="application_deadline"
              name="application_deadline"
              value={formData.application_deadline}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSubmitting ? "Creating..." : "Create Job Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
