import { useState, useRef, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import AdminLayout from '../../../layouts/admin/AdminLayout';
import { apiUrl, token, fileUrl } from '../http';

const CreateService = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [service, setService] = useState({});
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  const config = useMemo(
    () => ({ readonly: false, placeholder: placeholder || 'Content' }),
    [placeholder]
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await fetch(`${apiUrl}services/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token()}`,
          },
        });

        const result = await res.json();
        if (result.status) {
          setContent(result.data.content);
          setService(result.data);
          setValue('title', result.data.title);
          setValue('short_desc', result.data.short_desc);
          setValue('slug', result.data.slug);
          setValue('status', result.data.status);
        }
      } catch (error) {
        toast.error('Error fetching service data!');
      }
    };

    fetchService();
  }, [params.id, setValue]);

  const onSubmit = async (data) => {
    setIsDisable(true);
    const newData = { ...data, content, imageId };

    try {
      const res = await fetch(`${apiUrl}services/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
        body: JSON.stringify(newData),
      });

      const result = await res.json();
      if (result.status) {
        toast.success(result.message);
        navigate('/admin/services');
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Update failed!');
    }
    setIsDisable(false);
  };

  const handleFile = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await fetch(`${apiUrl}temp-image`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
        body: formData,
      });
      const result = await res.json();

      if (result.status) {
        setImageId(result.data.id);
        toast.success(result.message);
      } else {
        toast.error(result.errors.image[0]);
      }
    } catch (error) {
      toast.error('Image upload failed!');
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded-lg">
        <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">Edit Service</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900">Service Name</label>
            <input {...register('title', { required: 'Service Name is required' })} className="w-full p-2 border rounded" />
            {errors.title && <span className="text-red-600 text-sm">{errors.title.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Description</label>
            <textarea {...register('short_desc', { required: 'Description is required' })} className="w-full p-2 border rounded"></textarea>
            {errors.short_desc && <span className="text-red-600 text-sm">{errors.short_desc.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Content</label>
            <JoditEditor ref={editor} value={content} config={config} onBlur={(newContent) => setContent(newContent)} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Slug</label>
            <input {...register('slug', { required: 'Slug is required' })} className="w-full p-2 border rounded" />
            {errors.slug && <span className="text-red-600 text-sm">{errors.slug.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Service Image</label>
            <input type="file" onChange={handleFile} className="w-full p-2 border rounded" />
            {service.image && <img src={`${fileUrl}uploads/services/small/${service.image}`} alt="" className="mt-2 w-32" />}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900">Status</label>
            <select {...register('status', { required: 'Status is required' })} className="w-full p-2 border rounded">
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <button type="submit" disabled={isDisable} className="w-full bg-indigo-600 text-white p-2 rounded shadow hover:bg-indigo-500 disabled:bg-gray-400">
            Update
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateService;