import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleEdit = ({ match }) => {
  const [article, setArticle] = useState({});
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState(1);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await axios.get(`/api/articles/${match.params.id}`);
      setArticle(response.data);
      setTitle(response.data.title);
      setSlug(response.data.slug);
      setAuthor(response.data.author);
      setContent(response.data.content);
      setStatus(response.data.status);
    };

    fetchArticle();
  }, [match.params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('slug', slug);
      formData.append('author', author);
      formData.append('content', content);
      formData.append('image', image);
      formData.append('status', status);

      const response = await axios.put(`/api/articles/${article.id}/update`, formData);
      if (response.data.status) {
        alert('Article updated successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        {/* Repeat similar fields for slug, author, content, image, status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={status}
            onChange={(e) => setStatus(Number(e.target.value))}
          >
            <option value={1}>Published</option>
            <option value={0}>Draft</option>
          </select>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg mt-4">
          Update Article
        </button>
      </form>
    </div>
  );
};

export default ArticleEdit;
