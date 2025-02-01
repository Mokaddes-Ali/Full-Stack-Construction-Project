// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { motion } from "framer-motion";
// import AdminLayout from "../../../layouts/admin/AdminLayout";
// import { apiUrl, token } from "../http";

// const ArticleIndex = () => {
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
//   const imgUrl = "http://localhost:8000/uploads/Article/small/";

//   useEffect(() => {
//     const loadingTimeout = setTimeout(() => {
//       if (loading) setLoading(true);
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
//         clearTimeout(loadingTimeout);
//       }
//     };

//     fetchArticles();

//     return () => clearTimeout(loadingTimeout);
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this article?")) {
//       return;
//     }
//       const res = await fetch(apiUrl + "articles/delete/" + id, {
//         method: "DELETE",
//         headers: {
//           "Content-type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token()}`,
//         },
//       });

//       const result = await res.json();

//       if (result.status === true) {
//         const newArticles = articles.filter((article) => article.id !== id);
//         setArticles(newArticles);
//         setFilteredArticles(newArticles);
//         toast.success(result.message);
//       } else {
//         toast.error(result.message);
//       }
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
//       {loading ? (
//         <div className="flex justify-center items-center w-full h-screen bg-gray-100">
//           <motion.div className="w-10 h-10 rounded-full bg-blue-500 animate-ping" />
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
//             {/* Table Wrapper */}
//             <div className="overflow-x-auto">
//               <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
//                 <thead className="bg-indigo-600 text-white">
//                   <tr className="text-sm md:text-base">
//                     <th className="p-2 md:p-3 text-left">ID</th>
//                     <th className="p-2 md:p-3 text-left">Image</th>
//                     <th className="p-2 md:p-3 text-left">Title</th>
//                     <th className="p-2 md:p-3 text-left">Author</th>
//                     <th className="p-2 md:p-3 text-left hidden md:table-cell">
//                       Content
//                     </th>
//                     <th className="p-2 md:p-3 text-left">Status</th>
//                     <th className="p-2 md:p-3 text-left hidden sm:table-cell">
//                       Published
//                     </th>
//                     <th className="p-2 md:p-3 text-left">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {paginatedArticles.map((article, index) => (
//                     <motion.tr
//                       key={article.id}
//                       className="border-b border-gray-200 hover:bg-gray-100 text-sm md:text-base"
//                       initial={{ opacity: 0, scale: 1.2 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{
//                         type: "spring",
//                         stiffness: 100,
//                         damping: 25,
//                         delay: index * 0.1,
//                       }}
//                     >
//                       <td className="p-2 md:p-3">{article.id}</td>
//                       <td className="p-2 md:p-3">
//                         {article.image ? (
//                           <img
//                             src={`${imgUrl}/${article.image}`}
//                             alt={article.title}
//                             className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
//                           />
//                         ) : (
//                           <span className="text-gray-400">No Image</span>
//                         )}
//                       </td>
//                       <td className="p-2 md:p-3">{article.title}</td>
//                       <td className="p-2 md:p-3">{article.author}</td>
//                       <td className="p-2 md:p-3 hidden md:table-cell">
//                         {article.content &&
//                         typeof article.content === "string" &&
//                         article.content.length > 50
//                           ? article.content.slice(0, 50) + "..."
//                           : article.content}
//                       </td>
//                       <td className="p-2 md:p-3">
//                         <span
//                           className={`px-2 py-1 rounded-full text-white text-xs md:text-sm ${
//                             article.status === 1 ? "bg-green-500" : "bg-red-500"
//                           }`}
//                         >
//                           {article.status === 1 ? "Active" : "Inactive"}
//                         </span>
//                       </td>
//                       <td className="p-2 md:p-3 hidden sm:table-cell">
//                         {new Date(article.created_at).toLocaleDateString()}
//                       </td>
//                       <td className="p-2 md:p-3 flex gap-1 md:gap-2">
//                         <Link
//                           to={`/admin/articles/edit/${article.id}`}
//                           className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-400 text-xs md:text-sm flex items-center gap-1"
//                         >
//                           <FaEdit />
//                           <span className="hidden md:inline">Edit</span>
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(article.id)}
//                           className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-500 text-xs md:text-sm flex items-center gap-1"
//                         >
//                           <FaTrash />
//                           <span className="hidden md:inline">Delete</span>
//                         </button>
                       

//                       </td>
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
import { FaEdit, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import AdminLayout from "../../../layouts/admin/AdminLayout";
import { apiUrl, token } from "../http";

const ArticleIndex = () => {
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
  const imgUrl = "http://localhost:8000/uploads/Article/small/";

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      if (loading) setLoading(true);
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
        clearTimeout(loadingTimeout);
      }
    };

    fetchArticles();

    return () => clearTimeout(loadingTimeout);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) {
      return;
    }
    const res = await fetch(apiUrl + "articles/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      },
    });

    const result = await res.json();

    if (result.status === true) {
      const newArticles = articles.filter((article) => article.id !== id);
      setArticles(newArticles);
      setFilteredArticles(newArticles);
      toast.success(result.message);
    } else {
      toast.error(result.message);
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
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen bg-gray-100">
          <motion.div className="w-10 h-10 rounded-full bg-blue-500 animate-ping" />
        </div>
      ) : (
        <AdminLayout>
          <div className="w-full max-w-6xl p-3 rounded-lg bg-blue-50 dark:bg-gray-900">
            <h2 className="text-3xl font-bold text-center text-indigo-700 dark:text-indigo-300 mb-4">
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
                  className="px-4 py-2 border border-blue-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-800 dark:text-white"
                />
                <button
                  onClick={handleResetSearch}
                  className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-4 py-2 text-center"
                >
                  Reset
                </button>
              </div>

              {/* Sorting and Items Per Page Controls */}
              <div className="flex gap-4 items-center">
                {/* Sort by Title */}
                <div className="inline-block">
                  <label htmlFor="sortTitle" className="mr-2 dark:text-white">
                    Sort by Title:
                  </label>
                  <select
                    id="sortTitle"
                    onChange={() => handleSort("title")}
                    value={sortOptions.title}
                    className="px-2 py-1 rounded-md bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium text-sm"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {/* Sort by Author */}
                <div className="inline-block">
                  <label htmlFor="sortAuthor" className="mr-2 dark:text-white">
                    Sort by Author:
                  </label>
                  <select
                    id="sortAuthor"
                    onChange={() => handleSort("author")}
                    value={sortOptions.author}
                    className="px-2 py-1 rounded-md bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium text-sm"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {/* Sort by ID */}
                <div className="inline-block">
                  <label htmlFor="sortId" className="mr-2 dark:text-white">
                    Sort by ID:
                  </label>
                  <select
                    id="sortId"
                    onChange={() => handleSort("id")}
                    value={sortOptions.id}
                    className="px-2 py-1 rounded-md bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium text-sm"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>

                {/* Items Per Page */}
                <div className="inline-block">
                  <label htmlFor="itemsPerPage" className="mr-2 dark:text-white">
                    Items per page:
                  </label>
                  <select
                    id="itemsPerPage"
                    onChange={(e) => setItemsPerPage(e.target.value)}
                    value={itemsPerPage}
                    className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium text-sm"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={30}>30</option>
                    <option value="All">All</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
                  <tr className="text-sm md:text-base">
                    <th className="p-2 md:p-3 text-left">ID</th>
                    <th className="p-2 md:p-3 text-left">Image</th>
                    <th className="p-2 md:p-3 text-left">Title</th>
                    <th className="p-2 md:p-3 text-left">Author</th>
                    <th className="p-2 md:p-3 text-left hidden md:table-cell">
                      Content
                    </th>
                    <th className="p-2 md:p-3 text-left">Status</th>
                    <th className="p-2 md:p-3 text-left hidden sm:table-cell">
                      Published
                    </th>
                    <th className="p-2 md:p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedArticles.map((article, index) => (
                    <motion.tr
                      key={article.id}
                      className="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm md:text-base"
                      initial={{ opacity: 0, scale: 1.2 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 25,
                        delay: index * 0.1,
                      }}
                    >
                      <td className="p-2 md:p-3 dark:text-white">{article.id}</td>
                      <td className="p-2 md:p-3">
                        {article.image ? (
                          <img
                            src={`${imgUrl}/${article.image}`}
                            alt={article.title}
                            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
                          />
                        ) : (
                          <span className="text-gray-400">No Image</span>
                        )}
                      </td>
                      <td className="p-2 md:p-3 dark:text-white">{article.title}</td>
                      <td className="p-2 md:p-3 dark:text-white">{article.author}</td>
                      <td className="p-2 md:p-3 hidden md:table-cell dark:text-white">
                        {article.content &&
                        typeof article.content === "string" &&
                        article.content.length > 50
                          ? article.content.slice(0, 50) + "..."
                          : article.content}
                      </td>
                      <td className="p-2 md:p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-white text-xs md:text-sm ${
                            article.status === 1 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {article.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-2 md:p-3 hidden sm:table-cell dark:text-white">
                        {new Date(article.created_at).toLocaleDateString()}
                      </td>
                      <td className="p-2 md:p-3 flex gap-1 md:gap-2">
                        <Link
                          to={`/admin/articles/edit/${article.id}`}
                          className="text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80 font-medium rounded-lg text-sm px-2 py-1 text-center flex items-center gap-1"
                        >
                          <FaEdit />
                          <span className="hidden md:inline">Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="text-white bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-2 py-1 text-center flex items-center gap-1"
                        >
                          <FaTrash />
                          <span className="hidden md:inline">Delete</span>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {itemsPerPage !== "All" && (
              <div className="flex justify-center mt-4 gap-2">
                {Array.from({
                  length: Math.ceil(filteredArticles.length / itemsPerPage),
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePagination(index + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === index + 1
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </AdminLayout>
      )}
    </>
  );
};

export default ArticleIndex;