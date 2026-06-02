import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

const selectClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs transition-colors hover:border-primary/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";

const PostJob = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
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

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-4xl animate-fade-in px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <Button type="button" onClick={() => navigate("/admin/jobs")} variant="outline" size="icon" aria-label="Back">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-display text-2xl font-bold tracking-tight">Post a New Job</h1>
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
                <select name="experience" value={input.experience} onChange={changeEventHandler} className={selectClass}>
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
              {companies.length > 0 && (
                <div className="space-y-1.5 md:col-span-2">
                  <Label>Select Company</Label>
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {companies.map((company) => (
                          <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {loading ? (
              <Button className="mt-8 w-full" disabled>
                <Loader2 className="h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" variant="gradient" className="mt-8 w-full">
                Post Job
              </Button>
            )}

            {companies.length === 0 && (
              <div className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
                <AlertCircle className="h-4 w-4" />
                Please register a company before posting a job.
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};

export default PostJob;
