// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ArticleEdit = ({ match }) => {
//   const [article, setArticle] = useState({});
//   const [title, setTitle] = useState('');
//   const [slug, setSlug] = useState('');
//   const [author, setAuthor] = useState('');
//   const [content, setContent] = useState('');
//   const [status, setStatus] = useState(1);
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchArticle = async () => {
//       const response = await axios.get(`/api/articles/${match.params.id}`);
//       setArticle(response.data);
//       setTitle(response.data.title);
//       setSlug(response.data.slug);
//       setAuthor(response.data.author);
//       setContent(response.data.content);
//       setStatus(response.data.status);
//     };

//     fetchArticle();
//   }, [match.params.id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('title', title);
//       formData.append('slug', slug);
//       formData.append('author', author);
//       formData.append('content', content);
//       formData.append('image', image);
//       formData.append('status', status);

//       const response = await axios.put(`/api/articles/${article.id}/update`, formData);
//       if (response.data.status) {
//         alert('Article updated successfully!');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Something went wrong!');
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-semibold mb-4">Edit Article</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Title</label>
//           <input
//             type="text"
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//           />
//         </div>
//         {/* Repeat similar fields for slug, author, content, image, status */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">Status</label>
//           <select
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             value={status}
//             onChange={(e) => setStatus(Number(e.target.value))}
//           >
//             <option value={1}>Published</option>
//             <option value={0}>Draft</option>
//           </select>
//         </div>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <button type="submit" className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg mt-4">
//           Update Article
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ArticleEdit;

import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import JoditEditor from "jodit-react";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token } from "../http";

const ArticleEdit = () => {
  const { id } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [imageId, setImageId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const fileUrl = "http://localhost:8000/";

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // Fetch existing article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`${apiUrl}articles/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        });
        const result = await res.json();
        if (result.status) {
          setValue("title", result.data.title);
          setValue("slug", result.data.slug);
          setValue("author", result.data.author);
          setValue("status", result.data.status);
          setContent(result.data.content);
          setImageId(result.data.image_id);
          setImagePreview(fileUrl + "uploads/Article/small/" + result.data.image); // Set existing image if available
        } else {
          toast.error("Article not found!");
          navigate("/admin/articles");
        }
      } catch (error) {
        toast.error("Failed to load article!");
      }
    };
    fetchArticle();
  }, [id, navigate, setValue]);

  // Handle Image Upload
  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];

    if (!file) return;

    setImagePreview(URL.createObjectURL(file)); // Preview the local image

    formData.append("image", file);

    try {
      const response = await fetch(apiUrl + "temp-image", {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (result.status === false) {
        toast.error(result.errors.image[0]);
      } else {
        setImageId(result.data.id);
        setImagePreview(fileUrl + result.data.image_url); // Set server image URL
        toast.success(result.message);
      }
    } catch (error) {
      toast.error("Image upload failed!");
    }
  };

  // Submit Handler
  const onSubmit = async (data) => {
    const updatedData = { ...data, imageId, content };
    try {
      const res = await fetch(`${apiUrl}articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(updatedData),
      });
      const result = await res.json();
      if (result.status) {
        toast.success("Article updated successfully!");
        navigate("/admin/articles");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Update failed!");
    }
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

            {/* Local Image Preview */}
            {imagePreview && (
              <img src={imagePreview} alt="Article Preview" className="mt-2 w-40 h-40 object-cover rounded-lg" />
            )}
          </div>

          {/* Content Editor */}
          <div>
            <label className="block font-medium">Content</label>
            <JoditEditor ref={editor} value={content} onBlur={(newContent) => setContent(newContent)} />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button disabled={isDisable} className="px-6 py-3 bg-indigo-600 text-white rounded-lg">Update Article</button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default ArticleEdit;
