import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/Navbar.css";

export const Navbar = () => {
  const navigate = useNavigate()
  let pvtroute = JSON.parse(localStorage.getItem("pvtroute"))

  const logout = () =>{
    localStorage.removeItem("pvtroute")
    navigate("/")
  }

  return (
    <div className="nav_div">
      <div className="innerDiv py-4	">
        <h3 ><Link style={{color: 'white'}} to="/userPage">Dashboard</Link></h3>
        {pvtroute===null? (< Link to={"/"} style={{color: 'white', marginTop: '1.4rem'}} onClick={()=> navigate("/")}>Login </Link>):
        (<h4 style={{color: 'white', cursor: "pointer"}} onClick={logout}>Logout <Link style={{color: 'white'}}>{pvtroute.name}</Link></h4>)}
      </div>
    </div>
  );
};