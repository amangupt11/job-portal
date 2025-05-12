/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import useGetJobById from "@/hooks/useGetJobById";
import { useSelector } from "react-redux";

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
    <div>
      <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 my-5">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-5xl p-6 sm:p-8 border border-gray-200 shadow-lg rounded-md"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-8">
            <Button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl">Manage Job Applications</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Title</Label>
              <select
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="w-full p-2 border rounded-lg my-1"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="FullStack Developer">FullStack Developer</option>
                <option value="Data Science engineer">
                  Data Science engineer
                </option>
                <option value="AI/ML engineer">AI/ML engineer</option>
                <option value="UI/UX Developer">UI/UX Developer</option>
                <option value="Graphic Designer">Graphic Designer</option>
                <option value="Android Developer">Android Developer</option>
              </select>
            </div>
            <div>
              <Label>Job Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>Salary (CTC)</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                Salary support in LPA
              </p>
            </div>
            <div>
              <Label>Location</Label>
              <select
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full p-2 border rounded-lg my-1"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Gurugram">Gurugram</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
            <div>
              <Label>Job Type</Label>
              <select
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
                className="w-full p-2 border rounded-lg my-1"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <Label>Experience Level</Label>
              <select
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
                className="w-full p-2 border rounded-lg my-1"
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="Fresher">Fresher</option>
                <option value="0 - 2 Years">0 - 2 Years</option>
                <option value="2 - 5 Years">2 - 5 Years</option>
                <option value="5 -10 Years">5 -10 Years</option>
                <option value="10+ Years">10+ Years</option>
              </select>
            </div>
            <div>
              <Label>No. of Opening Positions</Label>
              <Input
                type="text"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-6">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
