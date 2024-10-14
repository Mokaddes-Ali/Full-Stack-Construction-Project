import{useState, useEffect} from 'react'
import { apiUrl,token } from '../../http';

const show = () => {

  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    const res = await fetch(apiUrl+'services',{
      'method': 'GET', 
      'headers': {
        'Content-type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${token()}`
    }
    
  });

  const result = await res.json();
  console.log(result);
}

useEffect(() => {
  fetchServices();
});

  return (
    <>

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
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-gray-100 p-4 shadow-md">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">Topbar</h1>
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Profile</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2 hover:bg-red-600">Logout</button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="p-4 flex-1 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Service Table</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Slug</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>

            {
  services && services.map((service) => {
    return (
      <tr className="border-b" key={service.id}>
        <td className="py-2 px-4">{service.id}</td>
        <td className="py-2 px-4">{service.name}</td>
        <td className="py-2 px-4">{service.slug}</td>
        <td className="py-2 px-4">{service.status}</td>
        <td className="py-2 px-4">
          <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2">Edit</button>
          <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Delete</button>
        </td>
      </tr>
    );
  })
}

    
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default show