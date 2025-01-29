import { useState, useRef, useMemo } from "react";
import { useForm, Controller } from "react-hook-form"; 
import "react-toastify/dist/ReactToastify.css";
import { apiUrl, token } from "../http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import { Textarea, Input, Select, Option } from "@material-tailwind/react";
import { PhotoIcon } from '@heroicons/react/24/solid';
import {motion} from 'framer-motion'
import AdminLayout from "../../../layouts/admin/AdminLayout";

const CreateService = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Content",
    }),
    [placeholder]
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const cleanContent = (rawContent) => {
    return rawContent.replace(/<p>/g, "").replace(/<\/p>/g, "");
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const cleanedContent = cleanContent(content);
    const newData = { ...data, content: cleanedContent, imageId: imageId };
    setIsDisable(true); 
    const res = await fetch(apiUrl + "services/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(newData),
    });

    const result = await res.json();

    if (result.status === true) {
      toast.success(result.message);
      navigate("/admin/services");
    } else {
      toast.error(result.message);
    }
    setIsDisable(false); 
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    const fileUrl = URL.createObjectURL(file);
    setImagePreview(fileUrl);

    await fetch(apiUrl + "temp-image", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === false) {
          toast.error(result.errors.image[0]);
        } else {
          setImageId(result.data.id);
        }
      });
  };

  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-full bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-center text-3xl font-bold text-gray-900 mb-6">
            Add New Service
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Title and Slug Inputs */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
  {/* Service Name */}
  <div className="sm:col-span-2">
    <Input
      type="text"
      {...register("title", { required: "Service Name is required" })}
      variant="standard"
      label="Service Name"
      placeholder="Enter Service Name"
      className={`block w-full rounded-md py-2.5 text-gray-900 ${
        errors.title ? "ring-red-500 focus:ring-red-500" : ""
      }`}
    />
    {errors.title && (
      <span className="text-sm text-red-600">{errors.title.message}</span>
    )}
  </div>

  {/* Service Slug */}
  <div className="sm:col-span-2">
    <Input
      type="text"
      {...register("slug", { required: "Slug is required" })}
      variant="standard"
      label="Service Slug"
      placeholder="Enter Slug"
      className={`block w-full rounded-md py-2.5 text-gray-900 ${
        errors.slug ? "ring-red-500 focus:ring-red-500" : ""
      }`}
    />
    {errors.slug && (
      <span className="text-sm text-red-600">{errors.slug.message}</span>
    )}
  </div>

  {/* Status Select */}
  <div className="sm:col-span-1">
    <Controller
      name="status"
      control={control}
      rules={{ required: "Status is required" }}
      render={({ field }) => (
        <Select
          {...field}
          label="Select Status"
          className="block w-full py-2.5"
        >
          <Option value="1">Active</Option>
          <Option value="0">Inactive</Option>
        </Select>
      )}
    />
    {errors.status && (
      <span className="text-sm text-red-600">{errors.status.message}</span>
    )}
  </div>
</div>


            {/* Image Upload Area */}
            <div>
              <div className="mt-4 flex items-center justify-between">
                <div className="w-[100%] flex items-center gap-6">
                  <div className="w-full rounded-lg border border-dashed border-gray-900/25 p-6 text-center">
                    <PhotoIcon className="mx-auto text-gray-300 w-12 h-12" />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        type="file"
                        onChange={handleFile}
                        className="sr-only"
                      />
                    </label>
                    <p className="text-sm text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                  {/* Image Preview */}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Uploaded Preview"
                      className="w-36 h-36 object-cover rounded-md shadow-md"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <Textarea
                {...register("short_desc", { required: "Description is required" })}
                label="Enter Description"
                color="green"
                className={`block w-full rounded-md py-2.5 mt-4 sm:text-sm ${
                  errors.short_desc ? "ring-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.short_desc && (
                <span className="text-sm text-red-600">
                  {errors.short_desc.message}
                </span>
              )}
            </div>

            {/* Content Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Content
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-3">
  <motion.button
    type="submit"
    disabled={isDisable}
    className="px-5 py-2 bg-pink-500 text-white font-semibold rounded-md shadow-md transform transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
    whileHover={{
      scale: 1.05,
      boxShadow: "0 4px 20px rgba(251, 113, 133, 0.5)", // Soft pink shadow effect
      backgroundColor: "#f472b6",  // Lighter pink on hover
      borderColor: "#f9a8d4",  // Light pink border on hover
    }}
    whileTap={{
      scale: 0.98,
    }}
    initial={{ opacity: 0.8 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
    focus={{
      ringWidth: 4,
      ringColor: "#fbbf24",  // Yellow ring when focused
      backgroundColor: "#ec4899",  // Darker pink when focused
    }}
  >
    {isDisable ? "Submitting..." : "Submit"}
  </motion.button>
</div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateService;
