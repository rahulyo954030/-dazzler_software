import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import GetUserData from "./GetUserData";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    let getId = JSON.parse(localStorage.getItem("pvtroute"));
    console.log(getId);
    axios
      .get(`http://localhost:8080/user/getUserData/${getId.userId}`)
      .then((res) => {
        console.log(res);
        setData(res.data.getUserData);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    let getId = JSON.parse(localStorage.getItem("pvtroute"));
    if (getId.type == "admin") {
      getAllData();
    } else {
      getData();
    }
  }, []);

  const getAllData = () => {
    axios
      .get(`http://localhost:8080/user/getAll`)
      .then((res) => {
        setData(res.data.getAllData);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  let getId = JSON.parse(localStorage.getItem("pvtroute"));

  return (
    <div>
      <div>
        <GetUserData data={data} getAllData={getAllData} />
      </div>
    </div>
  );
};
export default Dashboard;
