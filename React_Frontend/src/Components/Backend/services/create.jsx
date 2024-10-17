import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl, token } from '../../http';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';


const CreateService = ({ placeholder }) => { 
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [imageId, setImageId] = useState(null);

  const config = useMemo(() => ({
    readonly: false, 
    placeholder: placeholder || 'Content', 
  }), [placeholder]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const newData = { ...data, content };

    try {
      const res = await fetch(apiUrl + 'services/store', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      if (result.status === true) {
        toast.success(result.message);
        navigate('admin/services');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form.');
      console.error(error); // Log the error for debugging
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);

    await fetch(apiUrl + 'services/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token()}`
      },
      body: formData
    })
      .then(response => response.json())
      .then(result => {
        if (result.status == false) {
          toast.error(result.errors.image);
        } else {
          setImageId(result.id);
          toast.success(result.message);
        }
      })
    }



  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                placeholder='Service Name'
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.title ? 'ring-red-500 focus:ring-red-500' : ''}`}
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
                placeholder='Description'
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.short_desc ? 'ring-red-500 focus:ring-red-500' : ''}`}
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
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {}} // This can be omitted if not used
              />
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
                placeholder='Slug'
                className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${errors.slug ? 'ring-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.slug && (
                <span className="text-sm text-red-600">{errors.slug.message}</span>
              )}
            </div>
          </div>
    {/* // Service Image */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Service Image</label>
            <br />
            <input onChange={handleFile} type="file" className="" />

          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Status</label>
            <div className="mt-2">
              <select
                {...register('status', { required: 'Status is required' })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
              {errors.status && (
                <span className="text-sm text-red-600">{errors.status.message}</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit" disabled={isDisabled}
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
