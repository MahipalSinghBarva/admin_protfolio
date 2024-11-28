import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  clearAllForgotPasswordErrors,
  forgotPassword,
} from "@/store/slices/forgotResetPasswordSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SpacialLoadingButton from "./sub-component/SpacialLoadingButton";

const ForgotPassword = () => {
  const disptach = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleForgotPassword = () => {
    disptach(forgotPassword(email));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      disptach(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
    if (message !== null) {
      toast.success(message);
    }
  }, [disptach, isAuthenticated, error, loading]);

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className=" min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email to request for reset password
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Link
                  to="/login"
                  className="ml-auto inline-block text-sm underline"
                >
                  Remember your password?
                </Link>
              </div>
            </div>
            {!loading ? (
              <Button
                onClick={() => handleForgotPassword(email)}
                className="w-full border bg-blue-600  "
              >
                Forgot Password
              </Button>
            ) : (
              <SpacialLoadingButton content={"Requesting"} />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img
          src="https://img.freepik.com/free-vector/forgot-password-concept-illustration_114360-1123.jpg?size=338&ext=jpg&ga=GA1.1.2008272138.1726790400&semt=ais_hybrid"
          alt="login"
        />
      </div>
    </div>
  );
};

export default ForgotPassword;
