import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token } from "../http";

const ArticleAdd = () => {
  const editor = useRef(null);
  const [imageId, setImageId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // Add state for image preview
  const [isDisable, setIsDisable] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
      const newData = { ...data, imageId };

      try {
          const res = await fetch(apiUrl + "articles/store", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                  Authorization: `Bearer ${token()}`,
              },
              body: JSON.stringify(newData),
          });

          const result = await res.json();

          if (result.status) {
              toast.success(result.message);
              navigate("/admin/articles");
          } else {
              toast.error(result.message);
          }
      } catch (error) {
          toast.error("Something went wrong!");
      }
  };

  const handleFile = async (e) => {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      const fileUrl = URL.createObjectURL(file);
      setImagePreview(fileUrl);

      try {
          const res = await fetch(apiUrl + "temp-image", {
              method: "POST",
              headers: {
                  Accept: "application/json",
                  Authorization: `Bearer ${token()}`,
              },
              body: formData,
          });

          const result = await res.json();

          if (!result.status) {
              toast.error(result.errors.image[0]);
          } else {
              setImageId(result.data.id);
              toast.success("Image uploaded successfully!");
          }
      } catch (error) {
          toast.error("Image upload failed!");
      }
  };

  return (
      <AdminLayout>
          <div className="w-full max-w-6xl p-4 rounded-lg bg-blue-gray-100">
              <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
                  Add New Article
              </h2>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-12 gap-6">
                      {/* Title */}
                      <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-800">
                              Article Title
                          </label>
                          <input
                              type="text"
                              {...register("title", { required: "Title is required" })}
                              placeholder="Article Title"
                              className={`block w-full rounded-lg p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600 ${errors.title ? "ring-red-500 focus:ring-red-500" : ""}`}
                          />
                          {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
                      </div>

                      {/* Slug */}
                      <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-800">
                              Slug
                          </label>
                          <input
                              type="text"
                              {...register("slug", { required: "Slug is required" })}
                              placeholder="Slug"
                              className="block w-full rounded-lg p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                          />
                          {errors.slug && <span className="text-sm text-red-600">{errors.slug.message}</span>}
                      </div>

                      {/* Author */}
                      <div className="col-span-6">
                          <label className="block text-sm font-medium text-gray-800">
                              Author
                          </label>
                          <input
                              type="text"
                              {...register("author", { required: "Author is required" })}
                              placeholder="Author Name"
                              className="block w-full rounded-lg p-3 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                          />
                          {errors.author && <span className="text-sm text-red-600">{errors.author.message}</span>}
                      </div>

                      {/* Status */}
                      <div className="col-span-6">
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
                          {errors.status && <span className="text-sm text-red-600">{errors.status.message}</span>}
                      </div>

                     {/* Image Upload and Preview */}
<div className="col-span-12 flex gap-6">
    <div className="w-1/2">
        <label className="block text-sm font-medium text-gray-800">
            Article Image
        </label>
        <input type="file" onChange={handleFile} className="mt-2 w-full" />
    </div>
    
    {imagePreview && (
        <div className="w-1/2">
            <img
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-full h-48 object-cover rounded-lg shadow-md"
            />
        </div>
    )}
</div>


                      {/* Content */}
                      <div className="col-span-12">
                          <label className="block text-sm font-medium text-gray-800">
                              Content
                          </label>
                          <textarea
                              {...register("content", { required: "Content is required" })}
                              placeholder="Article Content"
                              className="block w-full h-32 rounded-lg p-2 text-gray-900 shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"
                          />
                          {errors.content && <span className="text-sm text-red-600">{errors.content.message}</span>}
                      </div>
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
  );
};

export default ArticleAdd;
