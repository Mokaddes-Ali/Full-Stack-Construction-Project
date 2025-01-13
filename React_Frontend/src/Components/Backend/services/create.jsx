import { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { apiUrl, token } from "../http";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
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
        }
        else {
          setImageId(result.data.id);
        }
      });
  };

  return (
    <>
      <AdminLayout>
        <div className="flex min-h-screen bg-gray-700">
          <div className="w-full bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
              Add New Service
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Title and Status in the same row */}
              <div className="flex flex-wrap gap-4 md:flex-nowrap">
                {/* Service Name */}
                <div className="flex-1 min-w-[300px]">
                  <label className="block text-sm font-medium text-gray-900">
                    Service Name
                  </label>
                  <input
                    type="text"
                    {...register("title", {
                      required: "Service Name is required",
                    })}
                    placeholder="Service Name"
                    className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${
                      errors.title ? "ring-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.title && (
                    <span className="text-sm text-red-600">
                      {errors.title.message}
                    </span>
                  )}
                </div>

                {/* Status */}
                <div className="flex-1 min-w-[300px]">
                  <label className="block text-sm font-medium text-gray-900">
                    Status
                  </label>
                  <select
                    {...register("status", { required: "Status is required" })}
                    className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
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

              <div className="flex flex-wrap gap-4 md:flex-nowrap">
                {/* Slug */}
                <div className="flex-1 min-w-[300px]">
                  <label className="block text-sm font-medium text-gray-900">
                    Slug
                  </label>
                  <input
                    type="text"
                    {...register("slug", { required: "Slug is required" })}
                    placeholder="Slug"
                    className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${
                      errors.slug ? "ring-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.slug && (
                    <span className="text-sm text-red-600">
                      {errors.slug.message}
                    </span>
                  )}
                </div>

                {/* Service Image */}
                <div className="flex-1 min-w-[300px]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-900">
                        Service Image
                      </label>
                      <input
                        onChange={handleFile}
                        type="file"
                        className="mt-2 w-full p-2 border rounded"
                      />
                    </div>
                    {imagePreview && (
                      <div>
                        <img
                          src={imagePreview}
                          alt="Uploaded Preview"
                          className="w-20 h-20 object-cover rounded-lg shadow-md"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div>
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Description
                  </label>
                  <textarea
                    {...register("short_desc", {
                      required: "Description is required",
                    })}
                    placeholder="Description"
                    className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${
                      errors.short_desc ? "ring-red-500 focus:ring-red-500" : ""
                    }`}
                  />
                  {errors.short_desc && (
                    <span className="text-sm text-red-600">
                      {errors.short_desc.message}
                    </span>
                  )}
                </div>

                {/* Content */}
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
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-4">
                <button
                  disabled={isDisable}
                  className="px-6 py-2 text-sm bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default CreateService;
