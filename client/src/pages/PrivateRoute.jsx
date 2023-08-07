import React from 'react'
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {

    let pvtroute = JSON.parse(localStorage.getItem("pvtroute")) || [];
    let auth = pvtroute.isLoggin;

    if(auth){
        return children
    }
  return ( <Navigate to= "/"/>
  )
}