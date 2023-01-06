import React from 'react'
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = ({children}) => {
  const token = useSelector((store) => store.users.accessToken);
    if(token == ""){
      return <Navigate to={"/"}/>
    }
    return children
}

export default PrivateRoute 