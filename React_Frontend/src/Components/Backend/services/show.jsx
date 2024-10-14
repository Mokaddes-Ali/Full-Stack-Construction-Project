import  {useEffect, useState} from 'react'
import { apiUrl, token } from '../../http';

const show = () => {

    const [services, setServices] = useState([]);

    const fetchServices = async () => {

        const res = await fetch(apiUrl+'services',
        {
            method: 'GET',
            headers: 
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`

            }
        });

        const result = await res.json();
        console.log(result);
    }

    useEffect(() => {
        fetchServices();
    }, []);
  return (
    <>
     <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">My Sidebar</h1>
        <ul className="mt-4">
          <li className="py-2 hover:bg-gray-700 cursor-pointer">Home</li>
          <li className="py-2 hover:bg-gray-700 cursor-pointer">About</li>
          <li className="py-2 hover:bg-gray-700 cursor-pointer">Services</li>
          <li className="py-2 hover:bg-gray-700 cursor-pointer">Contact</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl">My Topbar</h1>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-4">My Table</h2>
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
            Create
          </button>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="py-2 px-4 border-b border-gray-300">ID</th>
                  <th className="py-2 px-4 border-b border-gray-300">Name</th>
                  <th className="py-2 px-4 border-b border-gray-300">Slug</th>
                  <th className="py-2 px-4 border-b border-gray-300">Status</th>
                  <th className="py-2 px-4 border-b border-gray-300">Action</th>

                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td className="py-2 px-4 border-b border-gray-300">1</td>
                  <td className="py-2 px-4 border-b border-gray-300">Alice</td>
                  <td className="py-2 px-4 border-b border-gray-300">alice@example.com</td>
                  <td className="py-2 px-4 border-b border-gray-300">Active</td>
                    <td className="py-2 px-4 border-b border-gray-300">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded">
                        Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded">
                        Delete
                        </button>
                    </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default show