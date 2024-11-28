import React, { useEffect, useState } from "react";
import SpacialLoadingButton from "./SpacialLoadingButton";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllUserErrors,
  getUser,
  resetProfile,
  updatePassword,
} from "@/store/slices/userSlices";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const dispatch = useDispatch();

  const { loading, error, isUpdated, message } = useSelector(
    (state) => state.user
  );

  const [currentPassword, setcurrentPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confiramNewPassword, setconfiramNewPassword] = useState("");

  const handleUpdatePassword = () => {
    dispatch(updatePassword(currentPassword, newPassword, confiramNewPassword));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, loading, error, isUpdated]);
  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Update Password</h1>
            <p className="text-balance text-muted-foreground">
              Enter Your Password Here
            </p>
          </div>
          <div className="grid gap-4">
            <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5"></div>
            <div>
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <Input
                  type="text"
                  className="Your Full Name"
                  value={currentPassword}
                  onChange={(e) => setcurrentPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input
                  type="email"
                  className="Your Email Address"
                  value={newPassword}
                  onChange={(e) => setnewPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label>Confirm New Password</Label>
                <Input
                  type="text"
                  className="Phone Number"
                  value={confiramNewPassword}
                  onChange={(e) => setconfiramNewPassword(e.target.value)}
                />
              </div>
            </div>
            {!loading ? (
              <Button
                onClick={() => handleUpdatePassword()}
                className="w-full border  bg-blue-700 hover:bg-blue-400 text-white hover:text-black"
              >
                Update Paassword
              </Button>
            ) : (
              <SpacialLoadingButton content={"Updating Password"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
