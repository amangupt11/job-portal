import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
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
import { ArrowLeft, Loader2 } from "lucide-react";

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
            <h1 className="font-bold text-2xl">Job Posting Setup</h1>
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
                <option value="Data Science engineer">Data Science engineer</option>
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
               <p className="text-sm text-gray-500 mt-1">Salary support in LPA</p>
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
                name="experience"
                value={input.experience}
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
            {companies.length > 0 && (
              <div className="md:col-span-2">
                <Label>Select Company</Label>
                <Select onValueChange={selectChangeHandler}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies.map((company) => (
                        <SelectItem
                          key={company._id}
                          value={company?.name?.toLowerCase()}
                        >
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
            <Button className="w-full my-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-6">
              Post Job
            </Button>
          )}

          {companies.length === 0 && (
            <h1 className=" text-red-600 font-bold text-center my-3">
              Please register a company, before posting a job.
            </h1>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
