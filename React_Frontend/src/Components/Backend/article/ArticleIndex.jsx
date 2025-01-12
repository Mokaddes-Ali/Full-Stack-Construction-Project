// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
// import { motion } from "framer-motion";
// import axios from 'axios';
// import AdminLayout from "../../../layouts/admin/AdminLayout";
// import { apiUrl, token } from "../http";


// const ArticleIndex = ({ article }) => {
//   const [articles, setArticles] = useState([]);
//   const [filteredArticles, setFilteredArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortOptions, setSortOptions] = useState({
//     id: "asc",
//     title: "asc",
//     author: "asc",
//   });
//   const [itemsPerPage, setItemsPerPage] = useState(5);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showModal, setShowModal] = useState(false);
//   const [deleting, setDeleting] = useState(false);
//   const imgUrl = "http://localhost:8000/uploads/Article/small/";

//   useEffect(() => {
//     // Set a timeout to show loading if it takes more than 500ms
//     const loadingTimeout = setTimeout(() => {
//       if (loading) setLoading(true); // Ensure loading is shown if it takes more than 500ms
//     }, 50);

//     const fetchArticles = async () => {
//       try {
//         const res = await fetch(apiUrl + "articles", {
//           headers: {
//             Authorization: `Bearer ${token()}`,
//           },
//         });

//         const result = await res.json();

//         if (result.status) {
//           setArticles(result.data);
//           setFilteredArticles(result.data);
//         } else {
//           toast.error(result.message);
//         }
//       } catch (error) {
//         toast.error("Failed to fetch articles.");
//       } finally {
//         setLoading(false);
//         clearTimeout(loadingTimeout); // Clear timeout once data is loaded
//       }
//     };

//     fetchArticles();

//     return () => clearTimeout(loadingTimeout); // Clean up timeout if the component is unmounted
//   }, []);

//   const handleDelete = async () => {
//     const token = localStorage.getItem('authToken'); // Get the token from localStorage
//     if (!token) {
//       toast.error('You must be logged in to delete articles');
//       return;
//     }

//     setDeleting(true);
//     try {
//       // Replace with your actual API endpoint
//       const response = await axios.delete(`/api/articles/${article.id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Pass the token in headers
//         },
//       });

//       // Check the response
//       if (response.status === 200) {
//         toast.success('Article deleted successfully');
//         setShowModal(false); // Close the modal
//       } else {
//         toast.error('Failed to delete the article');
//       }
//     } catch (error) {
//       toast.error('Error deleting article: ' + error.message);
//     } finally {
//       setDeleting(false);
//     }
//   };


//   useEffect(() => {
//     if (searchQuery === "") {
//       setFilteredArticles(articles);
//     } else {
//       const filtered = articles.filter(
//         (article) =>
//           article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           article.author.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredArticles(filtered);
//     }
//   }, [searchQuery, articles]);

//   const handleSort = (key) => {
//     const newSortOrder = sortOptions[key] === "asc" ? "desc" : "asc";
//     setSortOptions({ ...sortOptions, [key]: newSortOrder });

//     const sorted = [...filteredArticles].sort((a, b) => {
//       if (newSortOrder === "asc") {
//         return a[key] > b[key] ? 1 : -1;
//       } else {
//         return a[key] < b[key] ? 1 : -1;
//       }
//     });
//     setFilteredArticles(sorted);
//   };

//   const handlePagination = (page) => {
//     setCurrentPage(page);
//   };

//   const handleResetSearch = () => {
//     setSearchQuery("");
//     setFilteredArticles(articles);
//   };

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedArticles =
//     itemsPerPage === "All"
//       ? filteredArticles
//       : filteredArticles.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <>
//       {/* Loading Spinner */}
//       {loading ? (
//         <div className="flex justify-center items-center w-full h-screen bg-gray-100">
//           <div className="flex justify-center gap-4 mt-10">
//             {[
//               "bg-red-500",
//               "bg-green-500",
//               "bg-blue-500",
//               "bg-yellow-500",
//               "bg-purple-500",
//             ].map((color, index) => (
//               <motion.div
//                 key={index}
//                 className={`w-6 h-6 rounded-full ${color}`}
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 200,
//                   damping: 20,
//                   delay: index * 0.2,
//                 }}
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <AdminLayout>
//           <div className="w-full max-w-6xl p-3 rounded-lg bg-blue-gray-100">
//             <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
//               Articles List
//             </h2>
//             {/* Search and Sorting Controls */}
//             <div className="mb-4 flex justify-between gap-4 items-center">
//               {/* Search Input and Reset Button */}
//               <div className="flex gap-2 items-center">
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search by title or author..."
//                   className="px-4 py-2 border rounded-md"
//                 />
//                 <button
//                   onClick={handleResetSearch}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Reset
//                 </button>
//               </div>

//               {/* Sorting and Items Per Page Controls */}
//               <div className="flex gap-4 items-center">
//                 {/* Sort by Title */}
//                 <div className="inline-block">
//                   <label htmlFor="sortTitle" className="mr-2">
//                     Sort by Title:
//                   </label>
//                   <select
//                     id="sortTitle"
//                     onChange={() => handleSort("title")}
//                     value={sortOptions.title}
//                     className="px-2 py-1 rounded-md"
//                   >
//                     <option value="asc">Ascending</option>
//                     <option value="desc">Descending</option>
//                   </select>
//                 </div>

//                 {/* Sort by Author */}
//                 <div className="inline-block">
//                   <label htmlFor="sortAuthor" className="mr-2">
//                     Sort by Author:
//                   </label>
//                   <select
//                     id="sortAuthor"
//                     onChange={() => handleSort("author")}
//                     value={sortOptions.author}
//                     className="px-2 py-1 rounded-md"
//                   >
//                     <option value="asc">Ascending</option>
//                     <option value="desc">Descending</option>
//                   </select>
//                 </div>

//                 {/* Sort by ID */}
//                 <div className="inline-block">
//                   <label htmlFor="sortId" className="mr-2">
//                     Sort by ID:
//                   </label>
//                   <select
//                     id="sortId"
//                     onChange={() => handleSort("id")}
//                     value={sortOptions.id}
//                     className="px-2 py-1 rounded-md"
//                   >
//                     <option value="asc">Ascending</option>
//                     <option value="desc">Descending</option>
//                   </select>
//                 </div>

//                 {/* Items Per Page */}
//                 <div className="inline-block">
//                   <label htmlFor="itemsPerPage" className="mr-2">
//                     Items per page:
//                   </label>
//                   <select
//                     id="itemsPerPage"
//                     onChange={(e) => setItemsPerPage(e.target.value)}
//                     value={itemsPerPage}
//                     className="px-2 py-1 rounded-md"
//                   >
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={30}>30</option>
//                     <option value="All">All</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//             {/* Table */}
//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 rounded-lg shadow-md">
//                 <thead className="bg-indigo-600 text-white">
//                   <tr>
//                     <th className="p-3 text-left">ID</th>
//                     <th className="p-3 text-left">Image</th>
//                     <th className="p-3 text-left">Title</th>
//                     <th className="p-3 text-left">Author</th>
//                     <th className="p-3 text-left">Content</th>
//                     <th className="p-3 text-left">Status</th>
//                     <th className="p-3 text-left">Published</th>
//                     <th className="p-3 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedArticles.map((article, index) => (
//                     <motion.tr
//                       key={article.id}
//                       className="border-b border-gray-200 hover:bg-gray-100"
//                       initial={{ opacity: 0, scale: 1.2 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 100,
//                         damping: 25,
//                         delay: index * 0.1,
//                       }}
//                     >
//                       <td className="p-3">{article.id}</td>
//                       <td className="p-3">
//                         {article.image ? (
//                           <img
//                             src={`${imgUrl}/${article.image}`}
//                             alt={article.title}
//                             className="w-16 h-16 object-cover rounded-md"
//                           />
//                         ) : (
//                           <span className="text-gray-400">No Image</span>
//                         )}
//                       </td>
//                       <td className="p-3">{article.title}</td>
//                       <td className="p-3">{article.author}</td>
//                       <td className="p-3">
//                         {article.content &&
//                         typeof article.content === "string" &&
//                         article.content.length > 50
//                           ? article.content.slice(0, 50) + "..."
//                           : article.content}
//                       </td>

//                       <td className="p-3">
//                         <span
//                           className={`px-2 py-1 rounded-full text-white text-sm ${
//                             article.status === 1 ? "bg-green-500" : "bg-red-500"
//                           }`}
//                         >
//                           {article.status === 1 ? "Active" : "Inactive"}
//                         </span>
//                       </td>
//                       <td className="p-3">
//                         {new Date(article.created_at).toLocaleDateString()}
//                       </td>
//                       <td className="p-3 flex gap-2">
//       <Link
//         to={`/admin/articles/${article.id}`}
//         className="bg-indigo-600 text-white px-3 py-1 rounded-md hover:bg-indigo-500 text-sm"
//       >
//         <FaEye className="mr-1" /> Show
//       </Link>
//       <Link
//         to={`/admin/articles/edit/${article.id}`}
//         className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400 text-sm"
//       >
//         <FaEdit className="mr-1" /> Edit
//       </Link>
//       <button
//         onClick={() => setShowModal(true)}
//         className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 text-sm"
//       >
//         <FaTrash className="mr-1" /> Delete
//       </button>

//       {/* Delete Confirmation Modal */}
//       <Modal
//         isOpen={showModal}
//         onRequestClose={() => setShowModal(false)}
//         className="bg-white p-4 rounded-lg shadow-md max-w-sm mx-auto"
//         overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-50"
//       >
//         <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this article?</h3>
//         <div className="flex gap-2 justify-end">
//           <button
//             onClick={() => setShowModal(false)}
//             className="bg-gray-300 text-black px-4 py-2 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleDelete}
//             disabled={deleting}
//             className={`bg-red-600 text-white px-4 py-2 rounded-md ${deleting && 'opacity-50'}`}
//           >
//             {deleting ? 'Deleting...' : 'Delete'}
//           </button>
//         </div>
//       </Modal>
//     </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Pagination Controls */}
//             {itemsPerPage !== "All" && (
//               <div className="flex justify-center mt-4 gap-2">
//                 {Array.from({
//                   length: Math.ceil(filteredArticles.length / itemsPerPage),
//                 }).map((_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handlePagination(index + 1)}
//                     className={`px-3 py-1 rounded-md ${
//                       currentPage === index + 1
//                         ? "bg-indigo-600 text-white"
//                         : "bg-gray-300"
//                     }`}
//                   >
//                     {index + 1}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </AdminLayout>
//       )}
//     </>
//   );
// };

// export default ArticleIndex;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { motion } from "framer-motion";
import axios from 'axios';
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token } from "../http";
import Modal from 'react-modal'; // Import Modal from react-modal

const ArticleIndex = ({ article }) => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOptions, setSortOptions] = useState({
    id: "asc",
    title: "asc",
    author: "asc",
  });
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const imgUrl = "http://localhost:8000/uploads/Article/small/";

  useEffect(() => {
    Modal.setAppElement('#root'); // Ensure accessibility
  }, []);

  useEffect(() => {
    // Set a timeout to show loading if it takes more than 500ms
    const loadingTimeout = setTimeout(() => {
      if (loading) setLoading(true); // Ensure loading is shown if it takes more than 500ms
    }, 50);

    const fetchArticles = async () => {
      try {
        const res = await fetch(apiUrl + "articles", {
          headers: {
            Authorization: `Bearer ${token()}`,
          },
        });

        const result = await res.json();

        if (result.status) {
          setArticles(result.data);
          setFilteredArticles(result.data);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Failed to fetch articles.");
      } finally {
        setLoading(false);
        clearTimeout(loadingTimeout); // Clear timeout once data is loaded
      }
    };

    fetchArticles();

    return () => clearTimeout(loadingTimeout); // Clean up timeout if the component is unmounted
  }, []);

  const handleDelete = async () => {
    

    setDeleting(true);
    try {
      // Replace with your actual API endpoint
      const response = await axios.delete(`/api/articles/${article.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        },
      });

      // Check the response
      if (response.status === 200) {
        toast.success('Article deleted successfully');
        setShowModal(false); // Close the modal
      } else {
        toast.error('Failed to delete the article');
      }
    } catch (error) {
      toast.error('Error deleting article: ' + error.message);
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredArticles(articles);
    } else {
      const filtered = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredArticles(filtered);
    }
  }, [searchQuery, articles]);

  const handleSort = (key) => {
    const newSortOrder = sortOptions[key] === "asc" ? "desc" : "asc";
    setSortOptions({ ...sortOptions, [key]: newSortOrder });

    const sorted = [...filteredArticles].sort((a, b) => {
      if (newSortOrder === "asc") {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setFilteredArticles(sorted);
  };

  const handlePagination = (page) => {
    setCurrentPage(page);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setFilteredArticles(articles);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedArticles =
    itemsPerPage === "All"
      ? filteredArticles
      : filteredArticles.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
          <div className="flex justify-center gap-4 mt-10">
            {[ "bg-red-500", "bg-green-500", "bg-blue-500", "bg-yellow-500", "bg-purple-500", ].map((color, index) => (
              <motion.div
                key={index}
                className={`w-6 h-6 rounded-full ${color}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <AdminLayout>
          <div className="w-full max-w-6xl p-3 rounded-lg bg-blue-gray-100">
            <h2 className="text-3xl font-bold text-center text-indigo-700 mb-4">
              Articles List
            </h2>
            {/* Search and Sorting Controls */}
            <div className="mb-4 flex justify-between gap-4 items-center">
              {/* Search Input and Reset Button */}
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by title or author..."
                  className="px-4 py-2 border rounded-md"
                />
                <button
                  onClick={handleResetSearch}
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                >
                  Reset
                </button>
              </div>

              {/* Sorting and Items Per Page Controls */}
              <div className="flex gap-4 items-center">
                {/* Sort by Title */}
                <div className="inline-block">
                  <label htmlFor="sortTitle" className="mr-2">
                    Sort by Title:
                  </label>
                  <select
                    id="sortTitle"
                    onChange={() => handleSort("title")}
                    value={sortOptions.title}
                    className="px-2 py-1 rounded-md"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {/* Sort by Author */}
                <div className="inline-block">
                  <label htmlFor="sortAuthor" className="mr-2">
                    Sort by Author:
                  </label>
                  <select
                    id="sortAuthor"
                    onChange={() => handleSort("author")}
                    value={sortOptions.author}
                    className="px-2 py-1 rounded-md"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {/* Sort by ID */}
                <div className="inline-block">
                  <label htmlFor="sortId" className="mr-2">
                    Sort by ID:
                  </label>
                  <select
                    id="sortId"
                    onChange={() => handleSort("id")}
                    value={sortOptions.id}
                    className="px-2 py-1 rounded-md"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {/* Items Per Page */}
                <div className="inline-block">
                  <label htmlFor="itemsPerPage" className="mr-2">
                    Items per page:
                  </label>
                  <select
                    id="itemsPerPage"
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    value={itemsPerPage}
                    className="px-2 py-1 rounded-md"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value="All">All</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Articles Table */}
            <table className="w-full bg-white shadow-md border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Author</th>
                  <th className="px-4 py-2 text-left">Created At</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedArticles.map((article) => (
                  <tr key={article.id}>
                    <td className="px-4 py-2">{article.id}</td>
                    <td className="px-4 py-2">{article.title}</td>
                    <td className="px-4 py-2">{article.author}</td>
                    <td className="px-4 py-2">{article.created_at}</td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/admin/articles/${article.id}`}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        <FaEye /> View
                      </Link>
                      <Link
                        to={`/admin/articles/edit/${article.id}`}
                        className="text-green-500 hover:underline mr-2"
                      >
                        <FaEdit /> Edit
                      </Link>
                      <button
                        onClick={() => setShowModal(true)}
                        className="text-red-500 hover:underline"
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-4">
              {Array.from({ length: Math.ceil(filteredArticles.length / itemsPerPage) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePagination(index + 1)}
                  className={`px-4 py-2 border rounded-md ${currentPage === index + 1 ? 'bg-indigo-700 text-white' : 'text-indigo-700'}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </AdminLayout>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Delete Article"
        className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-4 rounded-md shadow-lg max-w-xs mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Are you sure you want to delete this article?</h2>
          <div className="flex justify-between gap-4">
            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-md"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ArticleIndex;
