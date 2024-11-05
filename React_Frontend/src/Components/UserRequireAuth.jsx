import {useContext} from 'react';
import { UserAuthContext } from './Backend/context/UserAuth';

import { Navigate } from 'react-router-dom';

const UserRequireAuth = ({children}) => {

    const {user} = useContext(UserAuthContext);

    if(!user){
        return  <Navigate to = '/' />
    }

  return children;
  
  
}

export default UserRequireAuth