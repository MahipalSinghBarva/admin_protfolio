import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./Profile";
import UpdatePassword from "./UpdatePassword";
import UpdateProfile from "./UpdateProfile";

const Account = () => {
  const [selectedComponent, setSlectedComponent] = useState("Profile");
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 sm:pl-20">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <Link
              href="#"
              className={
                selectedComponent === "Profile"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={()=>setSlectedComponent("Profile")}
            >
              Profile
            </Link>
            <Link
              href="#"
              className={
                selectedComponent === "Update Password"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={()=>setSlectedComponent("Update Password")}

            >
              Update Paassword
            </Link>
            <Link
              href="#"
              className={
                selectedComponent === "Update Profile"
                  ? "font-semibold text-primary"
                  : ""
              }
              onClick={()=>setSlectedComponent("Update Profile")}
            >
              Update Profile
            </Link>
          </nav>
          <div className="grid gap-6">
            {(() => {
              switch (selectedComponent) {
                case "Profile":
                  return <Profile />;
                  break;
                case "Update Password":
                  return <UpdatePassword />;
                  break;
                case "Update Profile":
                  return <UpdateProfile />;
                  break;
              }
            })()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Account;
