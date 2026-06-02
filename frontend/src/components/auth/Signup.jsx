/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Eye, EyeOff, Loader2, Check, X, GraduationCap, Briefcase } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const [passwordRules, setPasswordRules] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    special: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const rules = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordRules(rules);
  };

  const isPasswordValid = () => {
    return Object.values(passwordRules).every(Boolean);
  };

  const changeEventHandler = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      validatePassword(value);
    }
    if (name === "phoneNumber") {
      const regex = /^[0-9]*$/;
      if (!regex.test(value)) {
        toast.error("Please enter only number.");
        return;
      }
    }
    setInput({ ...input, [name]: value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isPasswordValid()) {
      toast.error("Please enter a valid password.");
      return;
    }
    if (input.phoneNumber.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const rules = [
    { key: "length", label: "At least 8 characters" },
    { key: "uppercase", label: "One uppercase letter" },
    { key: "lowercase", label: "One lowercase letter" },
    { key: "special", label: "One special character" },
  ];

  const roleOptions = [
    { value: "student", label: "Student", icon: GraduationCap },
    { value: "recruiter", label: "Recruiter", icon: Briefcase },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="relative flex items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
        <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-60 w-96 -translate-x-1/2 rounded-full bg-fuchsia-400/15 blur-3xl" />

        <Card className="relative w-full max-w-lg animate-scale-in p-6 shadow-lg sm:p-8">
          <div className="mb-6 text-center">
            <h1 className="font-display text-2xl font-bold tracking-tight">Create your account</h1>
            <p className="mt-1 text-sm text-muted-foreground">Join thousands finding their next opportunity</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="fullname">Full Name</Label>
              <Input id="fullname" type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter your full name" />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="you@example.com" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input id="phoneNumber" type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="10-digit number" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={input.password}
                  name="password"
                  onChange={changeEventHandler}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="mt-2 grid grid-cols-1 gap-1.5 rounded-lg bg-muted/50 p-3 sm:grid-cols-2">
                {rules.map(({ key, label }) => (
                  <p key={key} className={`flex items-center gap-1.5 text-xs ${passwordRules[key] ? "text-success" : "text-muted-foreground"}`}>
                    {passwordRules[key] ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                    {label}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>I am a</Label>
              <div className="grid grid-cols-2 gap-3">
                {roleOptions.map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background p-3 text-sm font-medium transition-all hover:border-primary/40 has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:text-primary"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={value}
                      checked={input.role === value}
                      onChange={changeEventHandler}
                      className="sr-only"
                    />
                    <Icon className="h-4 w-4" />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="profile">Profile Photo</Label>
              <Input id="profile" accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />
            </div>

            <Button type="submit" variant="gradient" className="w-full" disabled={!isPasswordValid() || loading}>
              {loading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Please wait</>) : "Sign up"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Login
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
