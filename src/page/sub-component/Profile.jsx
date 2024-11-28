import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelector } from "react-redux";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full h-full">
      <div>
        <div className="grid w-[100%] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="mb-3">Full Profile Preview</p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5">
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Profile Image</Label>
              <img
                src={user.avatar.url}
                alt="avatar"
                className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
              />
            </div>
            <div className="grid gap-2 w-full sm:w-72">
              <Label>Resume</Label>
              <img
                src={user && user.avatar && user.resume.url}
                alt="resume"
                className="w-full h-auto sm:w-72 sm:h-72 rounded-2xl"
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <div className="grid gap-2">
              <Label>Full Name</Label>
              <Input type="text" defaultValue={user.fullName} disabled></Input>
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input type="email" defaultValue={user.email} disabled></Input>
            </div>
            <div className="grid gap-2">
              <Label>Phone Nubmer</Label>
              <Input type="number" defaultValue={user.phone} disabled></Input>
            </div>

            <div className="grid gap-2">
              <Label>Portfoloi URL</Label>
              <Input
                type="text"
                defaultValue={user.portfolioURL}
                disabled
              ></Input>
            </div>
            <div className="grid gap-2">
              <Label>GitHub URL</Label>
              <Input type="text" defaultValue={user.githubURL} disabled></Input>
            </div>
            <div className="grid gap-2">
              <Label>Linkdin URL</Label>
              <Input type="text" defaultValue={user.linkedIn} disabled></Input>
            </div>
            <div className="grid gap-2">
              <Label>Instagram URL</Label>
              <Input type="text" defaultValue={user.instagram} disabled></Input>
            </div>
            <div className="grid gap-2">
              <Label>Twiter URL</Label>
              <Input
                type="text"
                defaultValue={user.twitterURL}
                disabled
              ></Input>
            </div>
          </div>
          <div className="grid gap-2">
            <Label>About ME</Label>
            <Textarea type="text" defaultValue={user.aboutMe} disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
