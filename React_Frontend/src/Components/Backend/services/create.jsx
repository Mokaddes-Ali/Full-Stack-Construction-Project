import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';


const create = () => {
    const { register, handleSubmit, watch, formState:{errors}, } = useForm();
    const onSubmit = data => console.log(data);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [status, setStatus] = useState('active');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newService = { title, description, slug, status };
//     console.log(newService);
//     // এখানে API call করে service ডাটাগুলো সংরক্ষণ করা যেতে পারে।
//   };



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-2xl font-bold mb-8">Sidebar</h2>
        <ul>
          <li className="mb-4 hover:text-yellow-500">
            <a href="#">Dashboard</a>
          </li>
          <li className="mb-4 hover:text-yellow-500">
            <a href="#">Services</a>
          </li>
          <li className="mb-4 hover:text-yellow-500">
            <a href="#">Analytics</a>
          </li>
          <li className="mb-4 hover:text-yellow-500">
            <a href="#">Settings</a>
          </li>
        </ul>
      </div>

      {/* Main content */}
   
        {/* Topbar */}
        <div className="bg-gray-100 p-4 shadow-md">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Topbar</h1>
          </div>
        </div>


    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Service</h2>
      <form  onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Service Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter service name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter service description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter service slug"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Add Service
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};



export default create