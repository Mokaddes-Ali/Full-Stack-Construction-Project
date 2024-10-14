import { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl, token } from '../../http';


const CreateService = () => {

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,watch,
    formState: { errors },
  } = useForm();

 
    

  const onSubmit = async (data) => {
    // console.log(data);
    try {
      const res = await fetch(apiUrl + 'services/store', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(data)
      });

      const result = await res.json();
    //   console.log('API Result:', result); // Checking the response in console

      // Assuming the data is in result.data
      onSubmit(result.data || result);  // Adjust based on your API response structure
    } catch (error) {
      console.error('Error fetching services:', error);  // Log errors
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <ToastContainer />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Add New Service
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Service Name */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Service Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('title', { required: 'Service Name is required' })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.title ? 'ring-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.title && (
                <span className="text-sm text-red-600">{errors.title.message}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2">
              <textarea
                {...register('short_desc', { required: 'Description is required' })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.short_desc ? 'ring-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.short_desc && (
                <span className="text-sm text-red-600">{errors.short_desc.message}</span>
              )}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Content
            </label>
            <div className="mt-2">
              <textarea
                {...register('content', { required: 'Content is required' })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.content ? 'ring-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.content && (
                <span className="text-sm text-red-600">{errors.content.message}</span>
              )}
            </div>
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Slug
            </label>
            <div className="mt-2">
              <input
                type="text"
                {...register('slug', { required: 'Slug is required' })}
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                  errors.slug ? 'ring-red-500 focus:ring-red-500' : ''
                }`}
              />
              {errors.slug && (
                <span className="text-sm text-red-600">{errors.slug.message}</span>
              )}
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Status</label>
            <div className="mt-2">
              <select
                {...register('status', { required: 'Status is required' })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              {errors.status && (
                <span className="text-sm text-red-600">{errors.status.message}</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateService;
