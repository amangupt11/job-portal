import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });
  const { singleCompany } = useSelector((store) => store.company);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Compare with original values and only add if changed
    if (input.name.trim() && input.name !== singleCompany.name) {
      formData.append("name", input.name);
    }

    if (
      input.description.trim() &&
      input.description !== singleCompany.description
    ) {
      formData.append("description", input.description);
    }

    if (input.website.trim() && input.website !== singleCompany.website) {
      formData.append("website", input.website);
    }

    if (input.location.trim() && input.location !== singleCompany.location) {
      formData.append("location", input.location);
    }

    if (input.file) {
      formData.append("file", input.file);
    }

    if (
      !formData.has("name") &&
      !formData.has("description") &&
      !formData.has("website") &&
      !formData.has("location") &&
      !formData.has("file")
    ) {
      toast.error("No changes to update");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
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
        navigate("/admin/companies");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={submitHandler}>
          {/* Top Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 mb-8">
            <Button
              type="button"
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-2xl">Company Setup</h1>
          </div>

          {/* Form Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Company Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website (URL)</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <select
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="w-full p-2 border rounded-lg"
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
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>

          {/* Submit Button */}
          {loading ? (
            <Button className="w-full my-6">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
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

export default CompanySetup;
