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

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || "Content",
  }), [placeholder]);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
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

  const cleanContent = (rawContent) => {
    return rawContent.replace(/<p>/g, "").replace(/<\/p>/g, "");
  };

  const onSubmit = async (data) => {
    const cleanedContent = cleanContent(content);
    const updatedData = { ...data, imageId: imageId, content: cleanedContent };
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

  // const handleFile = async (e) => {
  //   const formData = new FormData();
  //   const file = e.target.files[0];
  //   formData.append("image", file);

  //   await fetch(apiUrl + "temp-image", {
  //     method: "PUT",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer ${token()}`,
  //     },
  //     body: formData,
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //       if (result.status === false) {
  //         toast.error(result.errors.image[0]);
  //       } else {
  //         setImageId(result.data.id);
  //         toast.success(result.message);
  //       }
  //     });
  // };


  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);

    await fetch(`${apiUrl}temp-image`, { // সবসময় PUT
        method: "PUT",
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
    })
    .catch(error => console.error("Error:", error));
};

return (
  <AdminLayout>
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg transition-colors">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-indigo-800 dark:text-indigo-400 mb-6">
        Edit Article
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div>
            <label className="block font-medium text-gray-800 dark:text-white">Title</label>
            <input {...register("title", { required: "Title is required" })} 
                   className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white" />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>

          <div>
            <label className="block font-medium text-gray-800 dark:text-white">Slug</label>
            <input {...register("slug", { required: "Slug is required" })} 
                   className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white" />
            {errors.slug && <span className="text-red-500">{errors.slug.message}</span>}
          </div>

          <div>
            <label className="block font-medium text-gray-800 dark:text-white">Status</label>
            <select {...register("status", { required: "Status is required" })} 
                    className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-800 dark:text-white">Author</label>
          <input {...register("author", { required: "Author is required" })} 
                 className="w-full p-3 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white" />
          {errors.author && <span className="text-red-500">{errors.author.message}</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block font-medium text-gray-800 dark:text-white">Article Image</label>
            <input type="file" onChange={handleFile} className="w-full bg-white dark:bg-gray-800 text-black dark:text-white" />
          </div>
          <div>
            {article.image && (
              <img src={`${fileUrl}uploads/Article/small/${article.image}`} alt="Article Preview"
                   className="mt-2 w-32 h-32 object-cover rounded-lg border dark:border-gray-700" />
            )}
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-800 dark:text-white">Content</label>
          <JoditEditor
            ref={editor}
            value={content}
            config={config}
            tabIndex={1}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>

        <div className="text-center">
          <button disabled={isDisable} className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-lg">
            Update Article
          </button>
        </div>
      </form>
    </div>
  </AdminLayout>
);
}

export default ArticleEdit;
