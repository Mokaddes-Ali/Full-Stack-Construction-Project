// import { useState, useRef, useMemo, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import 'react-toastify/dist/ReactToastify.css';
// import { apiUrl, token } from '../../http';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import JoditEditor from 'jodit-react';
// import AdminLayout from '../../../layouts/AdminLayout';

// const EditService = ({ placeholder }) => {
//   const editor = useRef(null);
//   const [content, setContent] = useState('');
//   const [isDisable, setIsDisable] = useState(false);
//   const [imageId, setImageId] = useState(null);
//   const [isEdit, setIsEdit] = useState(false); // Check if editing
//   const { id } = useParams(); // Get the service ID if editing
//   const navigate = useNavigate();

//   // Config for Jodit editor
//   const config = useMemo(() => ({
//     readonly: false,
//     placeholder: placeholder || 'Content',
//   }), [placeholder]);

//   // Form setup using react-hook-form
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm();

//   // Fetch existing service data for editing
//   useEffect(() => {
//     if (id) {
//       setIsEdit(true);
//       fetchServiceData(id);
//     }
//   }, [id]);

//   // Fetch service data by ID
//   const fetchServiceData = async (serviceId) => {
//     try {
//       const res = await fetch(`${apiUrl}services/${serviceId}`, {
//         headers: {
//           Authorization: `Bearer ${token()}`,
//         },
//       });
//       const result = await res.json();

//       if (result.status === true) {
//         setValue('title', result.data.title);
//         setValue('short_desc', result.data.short_desc);
//         setValue('slug', result.data.slug);
//         setValue('status', result.data.status);
//         setContent(result.data.content);
//         setImageId(result.data.image_id);
//       } else {
//         toast.error(result.message);
//       }
//     } catch (error) {
//       toast.error('Failed to load service data.');
//     }
//   };

//   // Handle form submission
//   const onSubmit = async (data) => {
//     const newData = { ...data, content, imageId: imageId };

//     try {
//       const endpoint = isEdit ? `services/update/${id}` : 'services/store'; // Determine API endpoint
//       const method = isEdit ? 'PUT' : 'POST';

//       const res = await fetch(`${apiUrl}${endpoint}`, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//           Authorization: `Bearer ${token()}`,
//         },
//         body: JSON.stringify(newData),
//       });

//       const result = await res.json();

//       if (result.status === true) {
//         toast.success(result.message);
//         navigate('/admin/services');
//       } else {
//         toast.error(result.message);
//       }
//     } catch (error) {
//       toast.error('An error occurred while submitting the form.');
//       console.error(error);
//     }
//   };

//   // Handle file upload
//   const handleFile = async (e) => {
//     const formData = new FormData();
//     const file = e.target.files[0];
//     formData.append('image', file);

//     try {
//       const res = await fetch(`${apiUrl}temp-image`, {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           Authorization: `Bearer ${token()}`,
//         },
//         body: formData,
//       });
//       const result = await res.json();

//       if (result.status === false) {
//         toast.error(result.errors.image[0]);
//       } else {
//         setImageId(result.data.id);
//         toast.success(result.message);
//       }
//     } catch (error) {
//       toast.error('Image upload failed.');
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//           {isEdit ? 'Edit Service' : 'Add New Service'}
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Service Name */}
//           <div>
//             <label className="block text-sm font-medium leading-6 text-gray-900">
//               Service Name
//             </label>
//             <div className="mt-2">
//               <input
//                 type="text"
//                 {...register('title', { required: 'Service Name is required' })}
//                 placeholder="Service Name"
//                 className={`block w-full rounded-md py-1.5 ${errors.title ? 'ring-red-500 focus:ring-red-500' : ''}`}
//               />
//               {errors.title && <span className="text-sm text-red-600">{errors.title.message}</span>}
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium leading-6 text-gray-900">
//               Description
//             </label>
//             <div className="mt-2">
//               <textarea
//                 {...register('short_desc', { required: 'Description is required' })}
//                 placeholder="Description"
//                 className={`block w-full rounded-md py-1.5 ${errors.short_desc ? 'ring-red-500 focus:ring-red-500' : ''}`}
//               />
//               {errors.short_desc && <span className="text-sm text-red-600">{errors.short_desc.message}</span>}
//             </div>
//           </div>

//           {/* Content */}
//           <div>
//             <label className="block text-sm font-medium leading-6 text-gray-900">
//               Content
//             </label>
//             <div className="mt-2">
//               <JoditEditor
//                 ref={editor}
//                 value={content}
//                 config={config}
//                 tabIndex={1}
//                 onBlur={(newContent) => setContent(newContent)}
//               />
//             </div>
//           </div>

//           {/* Slug */}
//           <div>
//             <label className="block text-sm font-medium leading-6 text-gray-900">
//               Slug
//             </label>
//             <div className="mt-2">
//               <input
//                 type="text"
//                 {...register('slug', { required: 'Slug is required' })}
//                 placeholder="Slug"
//                 className={`block w-full rounded-md py-1.5 ${errors.slug ? 'ring-red-500 focus:ring-red-500' : ''}`}
//               />
//               {errors.slug && <span className="text-sm text-red-600">{errors.slug.message}</span>}
//             </div>
//           </div>

//           {/* Service Image */}
//           <div>
//             <label className="block text-sm font-medium leading-6 text-gray-900">Service Image</label>
//             <input onChange={handleFile} type="file" />
//           </div>

//           {/* Status */}
//           <div>
//             <label className="block text-sm font-medium leading-6 text-gray-900">Status</label>
//             <div className="mt-2">
//               <select
//                 {...register('status', { required: 'Status is required' })}
//                 className="block w-full rounded-md py-1.5"
//               >
//                 <option value="1">Active</option>
//                 <option value="0">Inactive</option>
//               </select>
//               {errors.status && <span className="text-sm text-red-600">{errors.status.message}</span>}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div>
//             <button
//               disabled={isDisable}
//               className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
//             >
//               {isEdit ? 'Update' : 'Submit'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </AdminLayout>
//   );
// };

// export default EditService;


import { useState, useRef, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl, token } from '../../http';
import { useNavigate,useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import AdminLayout from '../../../layouts/AdminLayout';


const CreateService = ({ placeholder }) => { 
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [isDisable, setIsDisable] = useState(false);
  const [imageId, setImageId] = useState(null);
  const params = useParams();

  const config = useMemo(() => ({
    readonly: false, 
    placeholder: placeholder || 'Content', 
  }), [placeholder]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiUrl +'services/'+params.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
      console.log(result); 
      return{
        title: result.data.title,
        short_desc: result.data.short_desc,
        slug: result.data.slug,
        status: result.data.status,
        
      }
    }

  });

  const navigate = useNavigate();


  const onSubmit = async (data) => {
    const newData = { ...data, content, imageId: imageId };

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
         Services/Edit
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
             disabled={isDisable}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </AdminLayout>
    </>
  );
};

export default CreateService;
