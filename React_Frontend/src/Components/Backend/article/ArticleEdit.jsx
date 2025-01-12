import { useState, useEffect, useRef, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token, fileUrl } from '../http';

const ArticleEdit = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [article, setArticle] = useState({});
  const [imageId, setImageId] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  // Jodit Editor configuration
  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || "Content",
  }), [placeholder]);

  const { 
    register, handleSubmit, setValue, 
    formState: { errors } 
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiUrl + "articles/" + params.id, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      setContent(result.data.content);
      setArticle(result.data);
      return {
        title: result.data.title,
        author: result.data.author,
        slug: result.data.slug,
        status: result.data.status,
      };
    }
  });

  // Submit Handler
  const onSubmit = async (data) => {
    const updatedData = { ...data, imageId: imageId, content };
    const res = await fetch(apiUrl + 'articles/' + params.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(updatedData),
    });
    
    const result = await res.json();
    if (result.status === true) {
      toast.success("Article updated successfully!");
      navigate("/admin/article/index");
    } else {
      toast.error(result.message);
    }
  };

  // Handle image upload
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
      .then(response => response.json())
      .then(result => {
        if (result.status === false) {
          toast.error(result.errors.image[0]);
        } else {
          setImageId(result.data.id);
          toast.success(result.message);
        }
      });
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">Edit Article</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-medium">Title</label>
            <input {...register("title", { required: "Title is required" })} className="w-full p-3 border rounded-lg" />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>

          {/* Slug */}
          <div>
            <label className="block font-medium">Slug</label>
            <input {...register("slug", { required: "Slug is required" })} className="w-full p-3 border rounded-lg" />
            {errors.slug && <span className="text-red-500">{errors.slug.message}</span>}
          </div>

          {/* Author */}
          <div>
            <label className="block font-medium">Author</label>
            <input {...register("author", { required: "Author is required" })} className="w-full p-3 border rounded-lg" />
            {errors.author && <span className="text-red-500">{errors.author.message}</span>}
          </div>

          {/* Status */}
          <div>
            <label className="block font-medium">Status</label>
            <select {...register("status", { required: "Status is required" })} className="w-full p-3 border rounded-lg">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium">Article Image</label>
            <input type="file" onChange={handleFile} className="w-full" />

            {/* Image Preview */}
            {article.image && (
              <img
                src={`${fileUrl}uploads/Article/small/${article.image}`} // Adjust this URL as necessary
                alt="Article Preview"
                className="mt-2 w-40 h-40 object-cover rounded-lg"
              />
            )}
          </div>

          {/* Content Editor */}
          <div>
            <label className="block font-medium">Content</label>
            <JoditEditor ref={editor} value={content} onBlur={(newContent) => setContent(newContent)} config={config} />
            <div
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button disabled={isDisable} className="px-6 py-3 bg-indigo-600 text-white rounded-lg">
              Update Article
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ArticleEdit;
