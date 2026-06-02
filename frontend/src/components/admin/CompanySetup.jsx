import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const selectClass =
  "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm shadow-xs transition-colors hover:border-primary/30 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/30";

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
      navigate("/admin/companies");
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
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-3xl animate-fade-in px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-4">
          <Button
            type="button"
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            size="icon"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="font-display text-2xl font-bold tracking-tight">Company Setup</h1>
        </div>

        <Card className="p-6 sm:p-8">
          <form onSubmit={submitHandler}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="space-y-1.5">
                <Label>Company Name</Label>
                <Input type="text" name="name" value={input.name} onChange={changeEventHandler} />
              </div>
              <div className="space-y-1.5">
                <Label>Company Description</Label>
                <Input type="text" name="description" value={input.description} onChange={changeEventHandler} />
              </div>
              <div className="space-y-1.5">
                <Label>Website (URL)</Label>
                <Input type="text" name="website" value={input.website} onChange={changeEventHandler} />
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
              <div className="space-y-1.5 md:col-span-2">
                <Label>Logo</Label>
                <Input type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer" />
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

export default CompanySetup;
