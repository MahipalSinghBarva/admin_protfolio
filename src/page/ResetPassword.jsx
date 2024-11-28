import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import SpacialLoadingButton from "./sub-component/SpacialLoadingButton";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { clearAllForgotPasswordErrors, resetPassword } from "@/store/slices/forgotResetPasswordSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getUser } from "@/store/slices/userSlices";

const ResetPassword = () => {
  const dispatch = useDispatch();  
  const navigate = useNavigate();
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleResetPassword = () => {
    dispatch(resetPassword(token, password, confirmPassword));  
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
    if (message !== null) {
      toast.success(message);
      dispatch(getUser())
    }
  }, [dispatch, isAuthenticated, error, loading, message, token]);  

  return (
    <div className="w-full lg:grid lg:min-h-[100vh] lg:grid-cols-2 xl:min-h-[100vh]">
      <div className="min-h-[100vh] flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Reset Password</h1> {/* Corrected heading */}
            <p className="text-balance text-muted-foreground">
              Enter your new password to reset it
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"  // Corrected input type
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label> {/* Corrected label */}
              <Input
                type="password"  // Corrected input type
                value={confirmPassword}  // Corrected variable name
                onChange={(e) => setConfirmPassword(e.target.value)}  // Corrected onChange handler
                required
              />
            </div>

            {!loading ? (
              <Button
                onClick={handleResetPassword}  // Corrected handler name
                className="w-full border bg-blue-600"
              >
                Reset Password
              </Button>
            ) : (
              <SpacialLoadingButton content={"Requesting New Password"} />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center bg-muted">
        <img
          src="https://i.pinimg.com/736x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
          alt="Reset Password"
        />
      </div>
    </div>
  );
};

export default ResetPassword;
