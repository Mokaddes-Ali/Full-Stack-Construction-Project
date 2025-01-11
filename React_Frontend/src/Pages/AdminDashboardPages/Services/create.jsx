import { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl, token } from "../../../Components/http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import AdminLayout from "../../../layouts/admin/AdminLayout";

const CreateService = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Content",
    }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newData = { ...data, content, imageId: imageId };

    try {
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
        navigate("admin/services");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
      console.error(error);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);

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
        if (result.status == false) {
          toast.error(result.errors.image[0]);
        } else {
          setImageId(result.data.id);
          toast.success(result.message);
        }
      });
  };

  return (
    <>
    <AdminLayout>
        <div className="w-full max-w-6xl p-3 rounded-lg bg-blue-gray-100 ">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
            Add New Service
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-6">
              {/* Service Name - 50% */}
              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-800">
                  Service Name
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Service Name is required",
                  })}
                  placeholder="Service Name"
                  className={`block w-full rounded-lg p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 ${
                    errors.title ? "ring-red-500 focus:ring-red-500" : ""
                  }`}
                />
                {errors.title && (
                  <span className="text-sm text-red-600">
                    {errors.title.message}
                  </span>
                )}
              </div>

              {/* Service Image - 25% */}
              <div className="col-span-4">
                <label className="block text-sm font-medium text-gray-800">
                  Service Image
                </label>
                <input onChange={handleFile} type="file" className="mt-2 w-full" />
              </div>

              {/* Status - 25% */}
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-800">
                  Status
                </label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className="block w-full rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                {errors.status && (
                  <span className="text-sm text-red-600">
                    {errors.status.message}
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="grid grid-cols-10">
            <div className="col-span-5">
              <label className="block text-sm font-medium text-gray-800">
                Description
              </label>
              <textarea
                {...register("short_desc", {
                  required: "Description is required",
                })}
                placeholder="Description"
                className={`block h-12 w-full rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-1 focus:ring-indigo-600 ${
                  errors.short_desc ? "ring-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.short_desc && (
                <span className="text-sm text-red-600">
                  {errors.short_desc.message}
                </span>
              )}
            </div>
 

            {/* Slug */}
            <div className="col-span-4 ml-6">
              <label className="block text-sm font-medium text-gray-800">
                Slug
              </label>
              <input
                type="text"
                {...register("slug", { required: "Slug is required" })}
                placeholder="Slug"
                className={`block w-full rounded-lg p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 ${
                  errors.slug ? "ring-red-500 focus:ring-red-500" : ""
                }`}
              />
              {errors.slug && (
                <span className="text-sm text-red-600">
                  {errors.slug.message}
                </span>
              )}
            </div>
            </div>

            {/* Content */}
            <div className="">
              <label className="block text-sm font-medium text-gray-800">
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
            <div className="flex items-center justify-center">
            <button
              disabled={isDisable}
              className="w-20 text-center bg-indigo-600 text-white font-semibold p-3 rounded-lg shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              Submit
            </button>
            </div>

          </form>
        </div>

    </AdminLayout>
    </>
  );
};

export default CreateService;
