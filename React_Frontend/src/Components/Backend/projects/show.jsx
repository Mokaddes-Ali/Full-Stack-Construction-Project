import { useState, useEffect } from 'react';
import { apiUrl, token } from '../../http';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../layouts/AdminLayout';
import { toast } from 'react-toastify';


const Show = () => {
  const [projects, setProjects] = useState([]);

  // Fetch services from the API
  const fetchProjects = async () => {
    try {
      const res = await fetch(apiUrl + 'projects', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();
    //   console.log('API Result:', result); // Checking the response in console

      // Assuming the data is in result.data
      setProjects(result.data || result);  // Adjust based on your API response structure
    } catch (error) {
      console.error('Error fetching services:', error);  // Log errors
    }
  };


   const deleteProject = async (id) => {
    if(confirm('Are you sure you want to delete this service?')) {

      const res = await fetch(apiUrl + 'projects/delete/' + id, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token()}`,
        },
      });

      const result = await res.json();

      // console.log( result); 
      if (result.status == true) {
        const newProjects = projects.filter((project) => project.id != id);
        setProjects(newProjects);
        toast.success(result.message);
      } else{
        toast.error(result.message);
      }

    }

 
  }


  //Fetch services when component mounts
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
    <AdminLayout>
    <div className="">

        {/* Table Content */}
        <div className="p-4 flex-1 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Service Table</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Sector</th>
                <th className="py-2 px-4 border-b">Location</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Check if services exist and map through them */}
              {projects && projects.map((project) => (
                <tr key={project.id} className="bg-gray-100 text-left">
                  <td className="py-2 px-4 border-b">{project.id}</td>
                  <td className="py-2 px-4 border-b">{project.title}</td>
                  <td className="py-2 px-4 border-b">{project.short_desc}</td>
                  <td className="py-2 px-4 border-b">{project.sector}</td>
                  <td className="py-2 px-4 border-b">{project.location}</td>
                  <td className="py-2 px-4 border-b">
  <span
    className={`px-2 py-1 rounded-full text-white ${
        project.status === 'active' ? 'bg-green-500' : 'bg-red-500'
    }`}
  >
    {project.status === 'active' ? 'Active' : 'Inactive'}
  </span>
</td>
                  <td className="py-2 px-4 border-b">
                   
                      <Link to={`/admin/projects/edit/${project.id}`}>Edit</Link>
                    <button onClick={() => deleteProject(project.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </AdminLayout>
    </>
  );
};

export default Show;
