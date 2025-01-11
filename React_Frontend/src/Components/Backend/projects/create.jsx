import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl, token } from '../../http';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import AdminLayout from '../../../layouts/admin/AdminLayout';
import { IoMdArrowDropdown } from 'react-icons/io';

const Create = ({ placeholder }) => { 
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [isDisable, setIsDisable] = useState(false);
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
    const newData = { ...data, content, imageId: imageId };

    try {
      const res = await fetch(apiUrl + 'projects/store', {
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
        navigate('/admin/projects/create');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the form.');
      console.error(error);
    }
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    setIsDisable(true);
    

    await fetch(apiUrl + 'temp-image', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token()}`
      },
      body: formData
    }).then(response => response.json())
      .then(result => {
        setIsDisable(false);
        if (result.status == false) {
          toast.error(result.errors.image[0]);
        }
        // } else {
        //   setImageId(result.data.id);
        //   toast.success(result.message);
        // }
      })
  }

  return (
    <>
      <AdminLayout>
        <div className="flex min-h-screen bg-gray-700">
          <div className="w-full bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
              Add New Project
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Project Name */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Service Name</label>
                <input
                  type="text"
                  {...register('title', { required: 'Service Name is required' })}
                  placeholder="Service Name"
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${errors.title ? 'ring-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Description</label>
                <textarea
                  {...register('short_desc', { required: 'Description is required' })}
                  placeholder="Description"
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${errors.short_desc ? 'ring-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.short_desc && <span className="text-sm text-red-600">{errors.short_desc.message}</span>}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Content</label>
                <JoditEditor
                  ref={editor}
                  value={content}
                  config={config}
                  tabIndex={1} 
                  onBlur={(newContent) => setContent(newContent)} 
                />
              </div>

              {/* location */}
              <div>
                <label className="block text-sm font-medium text-gray-900">location</label>
                <textarea
                  {...register('location', { required: 'location is required' })}
                  placeholder="location"
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${errors.location ? 'ring-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.location && <span className="text-sm text-red-600">{errors.location.message}</span>}
              </div>

              {/* sector */}
              <div className="relative inline-block text-left">
    <label className="block text-sm font-medium text-gray-900">Sector</label>
    <select
      {...register('sector', { required: 'Sector is required' })}
      className={`block w-full mt-1 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${errors.sector ? 'ring-red-500 focus:ring-red-500' : ''}`}
    >
      <option value="">Select an option</option>
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
      <option value="Option 4">Option 4</option>
      <option value="Option 5">Option 5</option>
    </select>
    {errors.sector && <span className="text-sm text-red-600">{errors.sector.message}</span>}
  </div>

              {/* construction_type */}
              <div>
  <label className="block text-sm font-medium text-gray-900">Construction Type</label>
  <select
    {...register('construction_type', { required: 'Construction type is required' })}
    className={`block w-full mt-1 rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${errors.construction_type ? 'ring-red-500 focus:ring-red-500' : ''}`}
  >
    <option value="">Select construction type</option>
    <option value="Residential">Residential</option>
    <option value="Commercial">Commercial</option>
    <option value="Industrial">Industrial</option>
    <option value="Institutional">Institutional</option>
    <option value="Mixed-use">Mixed-use</option>
  </select>
  {errors.construction_type && <span className="text-sm text-red-600">{errors.construction_type.message}</span>}
</div>


              

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Slug</label>
                <input
                  type="text"
                  {...register('slug', { required: 'Slug is required' })}
                  placeholder="Slug"
                  className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${errors.slug ? 'ring-red-500 focus:ring-red-500' : ''}`}
                />
                {errors.slug && <span className="text-sm text-red-600">{errors.slug.message}</span>}
              </div>

              {/* Service Image */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Project Image</label>
                <input onChange={handleFile} type="file" className="mt-2" />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-900">Status</label>
                <select
                  {...register('status', { required: 'Status is required' })}
                  className="block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
                {errors.status && <span className="text-sm text-red-600">{errors.status.message}</span>}
              </div>

              {/* Submit Button */}
              <button
                disabled={isDisable}
                className="w-full flex justify-center bg-indigo-600 text-white font-semibold py-1.5 rounded-md shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default Create;