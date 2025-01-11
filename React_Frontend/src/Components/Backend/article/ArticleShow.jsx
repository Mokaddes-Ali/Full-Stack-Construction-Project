import{ useEffect, useState } from 'react';
import axios from 'axios';

const ArticleShow = ({ match }) => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await axios.get(`/api/articles/${match.params.id}`);
      setArticle(response.data);
    };

    fetchArticle();
  }, [match.params.id]);

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {article ? (
        <>
          <h2 className="text-3xl font-semibold mb-4">{article.title}</h2>
          <p className="text-lg text-gray-600">{article.content}</p>
          <div className="mt-6">
            <p className="text-gray-500">Author: {article.author}</p>
            <p className="text-gray-500">Status: {article.status === 1 ? 'Published' : 'Draft'}</p>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ArticleShow;
