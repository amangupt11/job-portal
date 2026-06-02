/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import useGetJobById from "@/hooks/useGetJobById";
import { useSelector } from "react-redux";

const selectClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs transition-colors hover:border-primary/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";

const UpdateJob = () => {
  const params = useParams();
  useGetJobById(params.id);

  const [input, setInput] = React.useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
  });
  const { singleJob } = useSelector((store) => store.job);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!singleJob) {
      toast.error("Job data not loaded yet.");
      return;
    }
    const formData = new FormData();

    if (input.title.trim() && input.title !== singleJob.title) {
      formData.append("title", input.title);
    }
    if (
      input.description.trim() &&
      input.description !== singleJob.description
    ) {
      formData.append("description", input.description);
    }
    if (
      input.requirements.trim() &&
      input.requirements !== singleJob.requirements
    ) {
      formData.append("requirements", input.requirements);
    }
    if (input.salary > 1 && input.salary !== singleJob.salary) {
      formData.append("salary", input.salary);
    }

    if (input.location.trim() && input.location !== singleJob.location) {
      formData.append("location", input.location);
    }
    if (input.jobType.trim() && input.jobType !== singleJob.jobType) {
      formData.append("jobType", input.jobType);
    }
    if (
      input.experienceLevel.trim() &&
      input.experienceLevel !== singleJob.experienceLevel
    ) {
      formData.append("experienceLevel", input.experienceLevel);
    }
    if (input.position && input.position !== singleJob.position) {
      formData.append("position", input.position);
    }
    if (
      !formData.has("title") &&
      !formData.has("description") &&
      !formData.has("requirements") &&
      !formData.has("salary") &&
      !formData.has("location") &&
      !formData.has("jobType") &&
      !formData.has("experienceLevel") &&
      !formData.has("position")
    ) {
      toast.error("No changes to update");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements?.join(", ") || "",
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experienceLevel: singleJob.experienceLevel || "",
        position: singleJob.position || "",
      });
    }
  }, [singleJob]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl animate-fade-in px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <Button type="button" onClick={() => navigate("/admin/jobs")} variant="outline" size="icon" aria-label="Back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-display text-2xl font-bold tracking-tight">Update Job</h1>
        </div>

        <Card className="p-6 sm:p-8">
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <select name="title" value={input.title} onChange={changeEventHandler} className={selectClass}>
                  <option value="" disabled>Select</option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="FullStack Developer">FullStack Developer</option>
                  <option value="Data Science engineer">Data Science engineer</option>
                  <option value="AI/ML engineer">AI/ML engineer</option>
                  <option value="UI/UX Developer">UI/UX Developer</option>
                  <option value="Graphic Designer">Graphic Designer</option>
                  <option value="Android Developer">Android Developer</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Job Description</Label>
                <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
              </div>
              <div className="space-y-1.5">
                <Label>Requirements</Label>
                <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} placeholder="Comma separated" />
              </div>
              <div className="space-y-1.5">
                <Label>Salary (CTC)</Label>
                <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} />
                <p className="text-xs text-muted-foreground">Enter the amount only — supported in LPA.</p>
              </div>
              <div className="space-y-1.5">
                <Label>Location</Label>
                <select name="location" value={input.location} onChange={changeEventHandler} className={selectClass}>
                  <option value="" disabled>Select</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Pune">Pune</option>
                  <option value="Gurugram">Gurugram</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Job Type</Label>
                <select name="jobType" value={input.jobType} onChange={changeEventHandler} className={selectClass}>
                  <option value="" disabled>Select</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>Experience Level</Label>
                <select name="experienceLevel" value={input.experienceLevel} onChange={changeEventHandler} className={selectClass}>
                  <option value="" disabled>Select</option>
                  <option value="Fresher">Fresher</option>
                  <option value="0 - 2 Years">0 - 2 Years</option>
                  <option value="2 - 5 Years">2 - 5 Years</option>
                  <option value="5 -10 Years">5 -10 Years</option>
                  <option value="10+ Years">10+ Years</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <Label>No. of Opening Positions</Label>
                <Input type="text" name="position" value={input.position} onChange={changeEventHandler} />
              </div>
            </div>

            {loading ? (
              <Button className="mt-8 w-full" disabled>
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" variant="gradient" className="mt-8 w-full">
                Update
              </Button>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default UpdateJob;
