/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 border border-gray-200 rounded-md p-4 sm:p-6 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">Sign Up</h1>

          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              placeholder="Enter your full name"
            />
          </div>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="abc123@gmail.com"
            />
          </div>

          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              placeholder="1234567890"
            />
          </div>

          <div className="my-2">
            <Label>Password</Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
              />
              <div
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>

            <div className="mt-2 ml-2 text-sm">
              <p
                className={`${
                  passwordRules.length ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordRules.length ? "✅" : "❌"} At least 8 characters
              </p>
              <p
                className={`${
                  passwordRules.uppercase ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordRules.uppercase ? "✅" : "❌"} One uppercase letter
              </p>
              <p
                className={`${
                  passwordRules.lowercase ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordRules.lowercase ? "✅" : "❌"} One lowercase letter
              </p>
              <p
                className={`${
                  passwordRules.special ? "text-green-600" : "text-red-600"
                }`}
              >
                {passwordRules.special ? "✅" : "❌"} One special character
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between my-4">
            <RadioGroup className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full my-4"
            disabled={!isPasswordValid() || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Signup"
            )}
          </Button>

          <span className="text-sm block text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 underline">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
