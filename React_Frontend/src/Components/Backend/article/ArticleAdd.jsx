import { useState, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token } from "../http";

const ArticleAdd = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [imageId, setImageId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [placeholder, setPlaceholder] = useState("Enter article content here...");

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Content",
    }),
    [placeholder]
  );

  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const cleanContent = (rawContent) => {
    return rawContent.replace(/<p>/g, "").replace(/<\/p>/g, "");
  };

  const onSubmit = async (data) => {
    const cleanedContent = cleanContent(content);
    const newData = { ...data, imageId, content: cleanedContent };
    
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
      navigate("/admin/article/index");
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
  };

  return (
    <AdminLayout>
      <div className="w-full max-w-6xl p-6 md:p-8 rounded-lg bg-gradient-to-r from-blue-100 to-indigo-200 shadow-lg mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-indigo-800 mb-6">Add New Article</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-black mb-2 block">Article Title<span className="text-red-500"> *</span></label>
              <input type="text" {...register("title", { required: "Title is required" })} placeholder="Enter Article Title"
                className="w-full rounded-lg p-3 text-black placeholder-gray-600 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-600" />
              {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
            </div>
            <div>
              <label className="text-lg font-medium text-black mb-2 block">Slug<span className="text-red-500"> *</span></label>
              <input type="text" {...register("slug", { required: "Slug is required" })} placeholder="Slug"
                className="w-full rounded-lg p-3 text-black placeholder-gray-600 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-600" />
              {errors.slug && <span className="text-sm text-red-600">{errors.slug.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-black mb-2 block">Author<span className="text-red-500"> *</span></label>
              <input type="text" {...register("author", { required: "Author is required" })} placeholder="Author Name"
                className="w-full rounded-lg p-3 text-black placeholder-gray-600 shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-600" />
              {errors.author && <span className="text-sm text-red-600">{errors.author.message}</span>}
            </div>
            <div>
              <label className="text-lg font-medium text-black mb-2 block">Status<span className="text-red-500"> *</span></label>
              <select {...register("status", { required: "Status is required" })}
                className="w-full rounded-lg p-3 text-black shadow-sm border border-gray-300 focus:ring-2 focus:ring-indigo-600">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              {errors.status && <span className="text-sm text-red-600">{errors.status.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-lg font-medium text-black mb-2 block">Article Image</label>
              <input type="file" onChange={handleFile} className="mt-2 w-full" />
            </div>
            {imagePreview && <div><img src={imagePreview} alt="Uploaded Preview" className="w-full h-48 object-cover rounded-lg shadow-md" /></div>}
          </div>

          <div>
            <label className="text-lg font-medium text-black mb-2 block">Content<span className="text-red-500"> *</span></label>
            <JoditEditor ref={editor} value={content} config={config} tabIndex={1} onBlur={(newContent) => setContent(newContent)} />
          </div>

          <div className="flex items-center justify-center">
            <button disabled={isDisable} className="w-full md:w-1/3 text-center bg-indigo-600 text-white font-semibold p-4 rounded-lg shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600">Submit</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ArticleAdd;
