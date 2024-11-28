import React, { useEffect, useState } from "react";
import SpacialLoadingButton from "./SpacialLoadingButton";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  updateExperience,
  clearAllExperninceErrors,
} from "@/store/slices/experninceSlice";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateExpernince = () => {
  const { id } = useParams();
  // console.log(id);

  const dispatch = useDispatch();
  const { loading, error, message, expernince } = useSelector(
    (state) => state.expernince
  );

  const [experninceData, setExperninceData] = useState();
  const [designation, setDesignation] = useState("");
  const [company, setcompany] = useState("");
  const [details, setDetails] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [companyLogo, setCompanyLogo] = useState(null);
  const [svgPreview, setSvgPreview] = useState("");

  console.log(experninceData, "jkhg");

  const handleAddLogo = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Only PNG, JPG, or SVG files are allowed.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size exceeds 10MB.");
        return;
      }
      setCompanyLogo(file);
      setSvgPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdateExperience = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("designation", designation);
    formData.append("details", details);
    formData.append("from", from);
    formData.append("to", to);
    formData.append("company", company);
    if (companyLogo) formData.append("companyLogo", companyLogo);

    dispatch(updateExperience(id, formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllExperninceErrors());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, message, id]);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await axios.get(
          `https://servrer-portfolio.onrender.com/api/v1/expernince/${id}`
        );
        const data = response.data.expernince;
        setExperninceData(data);
        setDesignation(data.designation || "");
        setcompany(data.company || "");
        setDetails(data.details || []);
        setFrom(data.from || "");
        setTo(data.to || "");
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    };

    fetchExperience();
  }, [id]);

  return (
    <>
      <div className="flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14">
        <form
          className="w-full px-5 md:w-[650px]"
          onSubmit={handleUpdateExperience}
        >
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="font-semibold leading-7 text-gray-900 text-3xl text-center">
                Update Experience
              </h2>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Designation
                  </Label>
                  <Input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Company Name
                  </Label>
                  <Input
                    type="text"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Company Name"
                    value={company}
                    onChange={(e) => setcompany(e.target.value)}
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Description
                  </Label>
                  <Textarea
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Description"
                    value={details}
                    onChange={(e) => setDetails(e.target.value.split("."))}
                  />
                </div>

                <div className="w-full sm:col-span-4">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Timeline
                  </Label>
                  <div className="flex gap-2 max-[500px]:flex-col">
                    <Input
                      type="text"
                      placeholder="From"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                    <Input
                      type="text"
                      placeholder="To"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>

                <div className="w-full col-span-full">
                  <Label className="block text-sm font-medium leading-6 text-gray-900">
                    Company Logo
                  </Label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      {svgPreview ? (
                        <img
                          className="mx-auto h-12 w-12"
                          src={svgPreview}
                          alt="Logo Preview"
                        />
                      ) : (
                        <svg
                          className="mx-auto h-12 w-12 text-gray-300"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleAddLogo}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, SVG up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {loading ? (
              <SpacialLoadingButton content={" Updating Experience"} />
            ) : (
              <Button type="submit" className="w-full">
                Update Experience
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateExpernince;
