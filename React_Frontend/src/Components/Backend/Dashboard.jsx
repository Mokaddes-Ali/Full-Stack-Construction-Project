import {useContext} from 'react'
import { AuthContext } from '../Backend/context/Auth';

const Dashboard = () => {
  const {logout} = useContext(AuthContext);
  return (
    <div>Dashboard
      <button onClick={logout} className="bg-blue-gray-900 text-deep-orange-900">Logout</button>
    </div>
    
  )
}

export default Dashboard