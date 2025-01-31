// import { useState, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { toast } from "react-toastify";
// import AdminLayout from "../../../layouts/admin/AdminLayout";
// import { apiUrl, token, fileUrl } from "../http";

// const Show = () => {
//   // const [services, setServices] = useState([]);
//   // const [filteredServices, setFilteredServices] = useState([]);
//   // const [loading, setLoading] = useState(false);
//   // const [search, setSearch] = useState("");
//   // const [perPage, setPerPage] = useState(5);
//   // const [sortedBy, setSortedBy] = useState("id");
//   // const [sortOrder, setSortOrder] = useState("desc");
//   // const [currentPage, setCurrentPage] = useState(1);

//   // const imgUrl = fileUrl + "uploads/services/small";

//   // // Fetch services from the API
//   // const fetchServices = async () => {
//   //   setLoading(true);
//   //   const res = await fetch(apiUrl + "services", {
//   //     method: "GET",
//   //     headers: {
//   //       "Content-type": "application/json",
//   //       Accept: "application/json",
//   //       Authorization: `Bearer ${token()}`,
//   //     },
//   //   });

//   //   const result = await res.json();
//   //   setServices(result.data || result);
//   //   setLoading(false);
//   // };

//   // // Delete service
//   // const deleteService = async (id) => {
//   //   if (confirm("Are you sure you want to delete this service?")) {
//   //     const res = await fetch(apiUrl + "services/delete/" + id, {
//   //       method: "DELETE",
//   //       headers: {
//   //         "Content-type": "application/json",
//   //         Accept: "application/json",
//   //         Authorization: `Bearer ${token()}`,
//   //       },
//   //     });

//   //     const result = await res.json();

//   //     if (result.status === true) {
//   //       const newServices = services.filter((service) => service.id !== id);
//   //       setServices(newServices);
//   //       toast.success(result.message);
//   //     } else {
//   //       toast.error(result.message);
//   //     }
//   //   }
//   // };

//   // const handleSearch = (e) => {
//   //   setSearch(e.target.value);
//   //   filterData(e.target.value);
//   // };

//   // const filterData = (query) => {
//   //   const filtered = services.filter(
//   //     (service) =>
//   //       service.title.toLowerCase().includes(query.toLowerCase()) ||
//   //       service.slug.toLowerCase().includes(query.toLowerCase())
//   //   );
//   //   setFilteredServices(filtered);
//   //   setCurrentPage(1);
//   // };

//   // const sortServices = (data) => {
//   //   return data.sort((a, b) => {
//   //     if (sortOrder === "asc") {
//   //       return a[sortedBy] > b[sortedBy] ? 1 : -1;
//   //     } else {
//   //       return a[sortedBy] < b[sortedBy] ? 1 : -1;
//   //     }
//   //   });
//   // };



//   // const handlePerPageChange = (e) => {
//   //   const value = e.target.value === "all" ? "all" : parseInt(e.target.value, 5);
//   //   setPerPage(value);
//   //   setCurrentPage(1); // Reset to first page
//   // };
  

//   // const paginatedServices =
//   //   perPage === "all"
//   //     ? filteredServices
//   //     : filteredServices.slice(
//   //         (currentPage - 1) * perPage,
//   //         currentPage * perPage
//   //       );

//   // const handlePageChange = (page) => {
//   //   setCurrentPage(page);
//   // };

//   // useEffect(() => {
//   //   fetchServices();
//   // }, []);

//   // useEffect(() => {
//   //   filterData(search);
//   // }, [services]);

//   // const sortedServices = sortServices(filteredServices);


//   const [services, setServices] = useState([]);
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [perPage, setPerPage] = useState(5);
//   const [sortedBy, setSortedBy] = useState("id");
//   const [sortOrder, setSortOrder] = useState("desc");
//   const [currentPage, setCurrentPage] = useState(1);

//   const imgUrl = fileUrl + "uploads/services/small";

//   // Fetch services from the API
//   const fetchServices = async () => {
//     setLoading(true);
//     const res = await fetch(apiUrl + "services", {
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Accept: "application/json",
//         Authorization: `Bearer ${token()}`,
//       },
//     });

//     const result = await res.json();
//     setServices(result.data || result);
//     setLoading(false);
//   };

//   // Delete service
//   const deleteService = async (id) => {
//     if (confirm("Are you sure you want to delete this service?")) {
//       const res = await fetch(apiUrl + "services/delete/" + id, {
//         method: "DELETE",
//         headers: {
//           "Content-type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${token()}`,
//         },
//       });

//       const result = await res.json();
//       if (result.status === true) {
//         setServices(services.filter((service) => service.id !== id));
//         toast.success(result.message);
//       } else {
//         toast.error(result.message);
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     filterData(e.target.value);
//   };

//   const filterData = (query) => {
//     const filtered = services.filter((service) =>
//       service.title.toLowerCase().includes(query.toLowerCase()) ||
//       service.slug.toLowerCase().includes(query.toLowerCase())
//     );
//     setFilteredServices(filtered);
//     setCurrentPage(1);
//   };

//   const sortServices = (data) => {
//     return data.sort((a, b) => {
//       return sortOrder === "asc"
//         ? a[sortedBy] > b[sortedBy]
//           ? 1
//           : -1
//         : a[sortedBy] < b[sortedBy]
//         ? 1
//         : -1;
//     });
//   };

//   const handlePerPageChange = (e) => {
//     const value = e.target.value === "all" ? "all" : parseInt(e.target.value, 10);
//     setPerPage(value);
//     setCurrentPage(1);
//   };

//   const paginatedServices =
//     perPage === "all"
//       ? filteredServices
//       : filteredServices.length > perPage
//       ? filteredServices.slice((currentPage - 1) * perPage, currentPage * perPage)
//       : filteredServices;

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   useEffect(() => {
//     filterData(search);
//   }, [services]);

//   return (
//     <>
// {loading ? (
//   <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-300 via-purple-400 to-pink-300">
//     <div className="flex flex-row items-center space-x-6">
//       <span className="loading loading-infinity loading-lg text-yellow-200 scale-150"></span>
//       <span className="loading loading-infinity loading-lg text-teal-200 scale-150"></span>
//       <span className="loading loading-infinity loading-lg text-pink-200 scale-150"></span>
//       <span className="loading loading-infinity loading-lg text-indigo-200 scale-150"></span>
//     </div>
//   </div>
// ) : (
// <AdminLayout>
//       <div className="p-4 bg-blue-50 dark:bg-gray-900">
//         <h2 className="text-2xl font-bold mb-4 text-center">Service Table</h2>
//         {/* Search and Sorting Controls */}
//         <div className="mb-4 flex justify-between items-center">
//         <div className="flex space-x-4">
//   <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
//     <NavLink to="/service/add">Add Service</NavLink> 
//   </button>
//   <input
//     type="text"
//     className="px-4 py-2 border w-[400px] dark:bg-black border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
//     placeholder="Search by Title or Slug"
//     value={search}
//     onChange={handleSearch}
//   />
//   <button
//     onClick={() => {
//       setSearch("");
//       filterData(""); // Clear the filter
//       setCurrentPage(1); // Reset to page 1
//     }}
//     className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
//   >
//     Reset

//   </button>
// </div>

//           <div className="flex space-x-4">
//             <select
//               onChange={handlePerPageChange}
//               className="text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-lg px-2 py-2 text-center me-2 mb-2"
//             >
//               <option value="5">5 per page</option>
//               <option value="10">10 per page</option>
//               <option value="25">25 per page</option>
//               <option value="50">50 per page</option>
//               <option value="100">100 per page</option>
//               <option value="all">All</option>
//             </select>
//             <div className="flex space-x-2">
//               <div>
//                 <span>Sort By: </span>
//                 <select
//                   value={sortedBy}
//                   onChange={(e) => setSortedBy(e.target.value)}
//                   className="text-black bg-gradient-to-r from-pink-300 via-pink-400 to-pink-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2"
//                 >
//                   <option value="id">ID</option>
//                   <option value="title">Title</option>
//                   <option value="slug">Slug</option>
//                 </select>
//                 <select
//                   value={sortOrder}
//                   onChange={(e) => setSortOrder(e.target.value)}
//                   className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2"
//                 >
//                   <option value="asc">ASC</option>
//                   <option value="desc">DESC</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
      
//         {filteredServices.length === 0 ? (
//           <div className="text-center text-xl pt-[250px] text-red-500 h-[480px] bg-blue-50">
//             No matched data found
//           </div>
//         ):(
//           <table className="min-w-full dark:bg-gray-400 border border-blue-300">
//             <thead>
//               <tr className="bg-blue-100 dark:bg-black text-center">
//                 <th className="py-2 px-4 border-b">ID</th>
//                 <th className="py-2 px-4 border-b">Title</th>
//                 <th className="py-2 px-4 border-b">Image</th>
//                 <th className="py-2 px-4 border-b">Description</th>
//                 <th className="py-2 px-4 border-b">Content</th>
//                 <th className="py-2 px-4 border-b">Slug</th>
//                 <th className="py-2 px-4 border-b">Status</th>
//                 <th className="py-2 px-4 border-b">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paginatedServices.map((service) => (
//                 <tr key={service.id} className="bg-blue-5 dark:bg-black text-left">
//                   <td className="py-2 px-4 border-b border-white">{service.id}</td>
//                   <td className="py-2 px-4 border-b border-white">{service.title}</td>
//                   <td className="py-2 px-4 border-b border-white">
//                     {service.image ? (
//                       <img
//                         src={`${imgUrl}/${service.image}`}
//                         alt={service.title}
//                         className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-md"
//                       />
//                     ) : (
//                       <span className="text-gray-400">No Image</span>
//                     )}
//                   </td>
//                   <td className="py-2 px-4 border-b border-white">{service.short_desc}</td>
//                   <td className="py-2 px-4 border-b border-white">{service.content}</td>
//                   <td className="py-2 px-4 border-b border-white">{service.slug}</td>
//                   <td className="py-2 px-4 border-b border-white">
//                     <span
//                       className={`px-2 py-1 rounded-full text-white ${
//                         service.status === 1 ? "bg-blue-500" : "bg-red-400"
//                       }`}
//                     >
//                       {service.status === 1 ? "Active" : "Inactive"}
//                     </span>
//                   </td>
//                   <td className="py-2 px-4 border-b border-white">
//                     <div className="flex space-x-2">
//                       <Link
//                         to={`/admin/services/edit/${service.id}`}
//                         className="text-blue-500 hover:text-blue-700"
//                       >
//                         <FaEdit />
//                       </Link>
//                       <button
//                         onClick={() => deleteService(service.id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//        {/* Pagination Controls */}
// <div className="flex justify-center items-center space-x-2 mt-4 p-4 rounded-lg">
//   <button
//     onClick={() => handlePageChange(currentPage - 1)}
//     disabled={currentPage === 1}
//     className={`px-4 py-2 rounded-md transition ${
//       currentPage === 1 
//         ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
//         : "bg-gray-800 text-white hover:bg-gray-700"
//     }`}
//   >
//     Previous
//   </button>

//   {Array.from({ length: Math.ceil(filteredServices.length / perPage) }, (_, index) => (
//     <button
//       key={index + 1}
//       onClick={() => handlePageChange(index + 1)}
//       className={`px-4 py-2 rounded-md transition ${
//         currentPage === index + 1 
//           ? "bg-blue-600 text-white" 
//           : "bg-gray-800 text-gray-300 hover:bg-gray-700"
//       }`}
//     >
//       {index + 1}
//     </button>
//   ))}

//   <button
//     onClick={() => handlePageChange(currentPage + 1)}
//     disabled={currentPage === Math.ceil(filteredServices.length / perPage)}
//     className={`px-4 py-2 rounded-md transition ${
//       currentPage === Math.ceil(filteredServices.length / perPage) 
//         ? "bg-gray-700 text-gray-400 cursor-not-allowed" 
//         : "bg-gray-800 text-white hover:bg-gray-700"
//     }`}
//   >
//     Next
//   </button>
// </div>


//       </div>
//     </AdminLayout>
//         )}
//       </>
//   );
// };

// export default Show;




import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Rating } from 'primereact/rating';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

export default function ProductsDemo() {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState(null);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [deleteProductsDialog, setDeleteProductsDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);

    useEffect(() => {
        ProductService.getProducts().then((data) => setProducts(data));
    }, []);

    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    };

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    };

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };

    const hideDeleteProductsDialog = () => {
        setDeleteProductsDialog(false);
    };

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    };

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    };

    const deleteProduct = () => {
        let _products = products.filter((val) => val.id !== product.id);

        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    };

    const findIndexById = (id) => {
        let index = -1;

        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteProductsDialog(true);
    };

    const deleteSelectedProducts = () => {
        let _products = products.filter((val) => !selectedProducts.includes(val));

        setProducts(_products);
        setDeleteProductsDialog(false);
        setSelectedProducts(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
    };

    const onCategoryChange = (e) => {
        let _product = { ...product };

        _product['category'] = e.value;
        setProduct(_product);
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };

    const leftToolbarTemplate = () => {
        return (
            <div className="flex flex-wrap gap-2">
                <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
                <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedProducts || !selectedProducts.length} />
            </div>
        );
    };

    const rightToolbarTemplate = () => {
        return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
    };

    const imageBodyTemplate = (rowData) => {
        return <img src={`https://primefaces.org/cdn/primereact/images/product/${rowData.image}`} alt={rowData.image} className="shadow-2 border-round" style={{ width: '64px' }} />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.price);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {
        return <Tag value={rowData.inventoryStatus} severity={getSeverity(rowData)}></Tag>;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Products</h4>
            <IconField iconPosition="left">
                <InputIcon className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </IconField>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );
    const deleteProductsDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                        dataKey="id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="code" header="Code" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="image" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="price" header="Price" body={priceBodyTemplate} sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="category" header="Category" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="rating" header="Reviews" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="inventoryStatus" header="Status" body={statusBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                {product.image && <img src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.image} className="product-image block m-auto pb-3" />}
                <div className="field">
                    <label htmlFor="name" className="font-bold">
                        Name
                    </label>
                    <InputText id="name" value={product.name} onChange={(e) => onInputChange(e, 'name')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.name })} />
                    {submitted && !product.name && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="description" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>

                <div className="field">
                    <label className="mb-3 font-bold">Category</label>
                    <div className="formgrid grid">
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category1" name="category" value="Accessories" onChange={onCategoryChange} checked={product.category === 'Accessories'} />
                            <label htmlFor="category1">Accessories</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category2" name="category" value="Clothing" onChange={onCategoryChange} checked={product.category === 'Clothing'} />
                            <label htmlFor="category2">Clothing</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category3" name="category" value="Electronics" onChange={onCategoryChange} checked={product.category === 'Electronics'} />
                            <label htmlFor="category3">Electronics</label>
                        </div>
                        <div className="field-radiobutton col-6">
                            <RadioButton inputId="category4" name="category" value="Fitness" onChange={onCategoryChange} checked={product.category === 'Fitness'} />
                            <label htmlFor="category4">Fitness</label>
                        </div>
                    </div>
                </div>

                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="price" className="font-bold">
                            Price
                        </label>
                        <InputNumber id="price" value={product.price} onValueChange={(e) => onInputNumberChange(e, 'price')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="quantity" className="font-bold">
                            Quantity
                        </label>
                        <InputNumber id="quantity" value={product.quantity} onValueChange={(e) => onInputNumberChange(e, 'quantity')} />
                    </div>
                </div>
            </Dialog>

            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>

            <Dialog visible={deleteProductsDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductsDialogFooter} onHide={hideDeleteProductsDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete the selected products?</span>}
                </div>
            </Dialog>
        </div>
    );
}
        