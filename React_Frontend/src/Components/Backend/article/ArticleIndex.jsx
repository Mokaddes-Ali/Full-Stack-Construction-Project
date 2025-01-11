import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaEye } from 'react-icons/fa';

const ArticleIndex = () => {
  const [articles, setArticles] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleIdToDelete, setArticleIdToDelete] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get('/api/articles');
      setArticles(response.data.data);
    };

    fetchArticles();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/articles/${articleIdToDelete}`);
      setArticles(articles.filter((article) => article.id !== articleIdToDelete));
      setShowDeleteModal(false);
    } catch (err) {
      alert('Error deleting article');
    }
  };

  return (
    <div className="overflow-x-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Articles</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Author</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <td className="py-2 px-4 border-b">{article.title}</td>
              <td className="py-2 px-4 border-b">{article.author}</td>
              <td className="py-2 px-4 border-b">{article.status === 1 ? 'Published' : 'Draft'}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => window.location.href = `/articles/edit/${article.id}`}
                >
                  <FaEdit />
                </button>
                <button
                  className="text-red-500 mr-2"
                  onClick={() => {
                    setArticleIdToDelete(article.id);
                    setShowDeleteModal(true);
                  }}
                >
                  <FaTrashAlt />
                </button>
                <button
                  className="text-green-500"
                  onClick={() => window.location.href = `/articles/show/${article.id}`}
                >
                  <FaEye />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              Yes, delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleIndex;
