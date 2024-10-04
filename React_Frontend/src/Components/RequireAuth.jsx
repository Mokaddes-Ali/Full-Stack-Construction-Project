import {useContext} from 'react';
import { AuthContext } from './Backend/context/Auth';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({children}) => {

    const {user} = useContext(AuthContext);

    if(!user){
        return  <Navigate to = '/login' />
    }

  return children;
  
  
}

export default RequireAuth;