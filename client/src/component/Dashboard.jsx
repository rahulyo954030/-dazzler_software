import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import GetUserData from "./GetUserData";

const Dashboard = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    let getId = JSON.parse(localStorage.getItem("pvtroute"));
    axios
      .get(`http://localhost:8080/user/getUserData/${getId.userId}`)
      .then((res) => {
        setData(res.data.getUserData);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  useEffect(() => {
    let getId = JSON.parse(localStorage.getItem("pvtroute"));
    if (getId.type == "Admin") {
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

  // Search
  const handleSearch = (e) => {
    let value = e.target.value;
    if (value.length !== 0) {
      axios
        .get(`http://localhost:8080/user/search?q=${value}`)
        .then((res) => {
          setData(res.data.search);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getAllData();
    }
  };

  return (
    <div>
      <div>
        <GetUserData
          data={data}
          getAllData={getAllData}
          handleSearch={handleSearch}
        />
      </div>
    </div>
  );
};
export default Dashboard;
