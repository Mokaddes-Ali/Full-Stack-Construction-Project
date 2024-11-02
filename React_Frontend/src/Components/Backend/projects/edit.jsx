import { useState, useRef, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl, token, fileUrl } from '../../http';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import AdminLayout from '../../../layouts/AdminLayout';

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [project, setProject] = useState({});
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Content',
  }), [placeholder]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // Use reset to set default values
  } = useForm();

  // Fetch project data on component mount
  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const res = await fetch(`${apiUrl}projects/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token()}`, // Fixed template literal
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch project data');
        }

        const result = await res.json();
        setContent(result.data.content);
        setProject(result.data);

        // Set form default values
        reset({
          title: result.data.title,
          short_desc: result.data.short_desc,
          construction_type: result.data.construction_type,
          sector: result.data.sector,
          location: result.data.location,
          slug: result.data.slug,
          status: result.data.status,
        });
      } catch (error) {
        toast.error('Error fetching project data: ' + error.message);
      }
    };

    fetchProjectData();
  }, [params.id, reset]);

  const onSubmit = async (data) => {
    const newData = { ...data, content, imageId };

    try {
      const res = await fetch(`${apiUrl}projects/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`, // Fixed template literal
        },
        body: JSON.stringify(newData),
      });

      const result = await res.json();

      if (result.status) {
        toast.success(result.message);
        navigate('/admin/dashboard');
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

    //temporary image upload
    await fetch(apiUrl + 'temp-image', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token()}`
      },
      body: formData
    }).then(response => response.json())
      .then(result => {
        if (result.status == false) {
          toast.error(result.errors.image[0]);
        } else {
          setImageId(result.data.id);
          toast.success(result.message);
        }
      })
    }
    
  return (
    <>
    <AdminLayout>
      <div className="">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Update/project
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
                  tabIndex={1} 
                  onBlur={newContent => setContent(newContent)} 
                  onChange={newContent => {}} 
                />
              </div>
            </div>
  
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-900">Location</label>
              <textarea
                {...register('location', { required: 'Location is required' })}
                placeholder="Location"
                className={`block w-full rounded-md py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm ${errors.location ? 'ring-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.location && <span className="text-sm text-red-600">{errors.location.message}</span>}
            </div>
  
            {/* Sector */}
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
  
            {/* Construction Type */}
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
  
            {/* Product Image */}
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Product Image</label>
              <br />
            <input onChange={handleFile} type="file" />
           
            {
            project.image && <img src={fileUrl+'uploads/ projects/small/'+ project.image} alt = ""/>

            }
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
                disabled={isDisable}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  </>
  
  );
};

export default Create;