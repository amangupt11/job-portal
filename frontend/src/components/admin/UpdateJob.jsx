/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { use, useEffect, useState } from "react";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import useGetJobById from "@/hooks/useGetJobById";
import { useSelector } from "react-redux";

const UpdateJob = () => {
  const params = useParams();
  useGetJobById(params.id);
  const [loading, setLoading] = React.useState(false);
  const { singleJob } = useSelector((store) => store.job);
  const navigate = useNavigate();
  const [input, setInput] = React.useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
  });
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/update/${params.id}`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
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
          name: singleJob.name || "",
          description: singleJob.description || "",
          website: singleJob.website || "",
          location: singleJob.location || "",
          file: singleJob.file || null,
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
          <h1 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            Update a Job
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
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
              <Label>Salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
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
                  Select a Location
                </option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Gurugram">Gurugram</option>
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
                  Select a Job Type
                </option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={changeEventHandler}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
            <div>
              <Label>No. of Positions</Label>
              <Input
                type="number"
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
