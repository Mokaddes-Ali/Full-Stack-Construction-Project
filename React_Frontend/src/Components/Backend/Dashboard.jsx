import {useContext} from 'react'
import { AuthContext } from '../Backend/context/Auth';
import AdminLayout from '../../layouts/AdminLayout';


const Dashboard = () => {
  const {logout} = useContext(AuthContext);
  return (
    <>
    <AdminLayout>
    <div>
      Dashboard
      <button onClick={logout} className="bg-blue-gray-900 text-deep-orange-900">Logout</button>
    </div>
    </AdminLayout>
    </>
    
  )
}

export default Dashboard