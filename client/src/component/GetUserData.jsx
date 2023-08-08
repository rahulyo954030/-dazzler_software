import React from "react";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";

const GetUserData = ({ data, getAllData, handleSearch }) => {
  let getId = JSON.parse(localStorage.getItem("pvtroute"));

  // Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete?") === true) {
      axios
        .delete(`http://localhost:8080/user/delete/${id}`)
        .then((res) => {
          getAllData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // setLoader(false)
    }
  };
  return (
    <div>
      {data?.length != 0 ? (
        <>
          <TableContainer
            className=""
            style={{ marginTop: "3rem" }}
            component={Paper}
          >
            {data?.length >= 1 ? (
            <input
              onChange={handleSearch}
              style={{
                height: "2rem",
                width: "15rem",
                marginLeft: "15rem",
              }}
              placeholder="Search"
            />
          ) : null}
            <Table
              sx={{ minWidth: 800 }}
              style={{ backgroundColor: "#f3e8ff", marginTop: "1rem" }}
              aria-label="simple table"
            >
              <TableHead >
                <TableRow>
                  <TableCell style={{fontSize: "16px", fontWeight: "bold"}} align="center">Username</TableCell>
                  <TableCell style={{fontSize: "16px", fontWeight: "bold"}} align="center">Email</TableCell>
                  <TableCell style={{fontSize: "16px", fontWeight: "bold"}} align="center">PhoneNo</TableCell>
                  <TableCell style={{fontSize: "16px", fontWeight: "bold"}} align="center">Type</TableCell>
                  <TableCell style={{fontSize: "16px", fontWeight: "bold"}} align="center">Gender</TableCell>
                  {
                    <>
                      {getId?.type == "Admin" ? (
                        <TableCell style={{fontSize: "16px", fontWeight: "bold"}} align="center">Delete</TableCell>
                      ) : null}
                    </>
                  }
                </TableRow>
              </TableHead>
              <TableBody style={{ border: "1px solid #7e22ce" }}>
                {data?.length > 0 ? (
                  <>
                    {data?.map((e) => {
                      if (e?.type === "Admin") return;
                      return (
                        <>
                          <TableRow key={e._id}>
                            <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{e.userName}</TableCell>
                            <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{e.email}</TableCell>
                            <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{e.phoneNo}</TableCell>
                            <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{e.type}</TableCell>
                            <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{e.gender}</TableCell>
                            <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">
                              <button
                                style={{
                                  width: "5rem",
                                  height: "2.5rem",
                                  backgroundColor: "#ecf5f5",
                                  border: "1px solid",
                                  cursor: "pointer",
                                  borderRadius: "5px",
                                  fontWeight: "500"
                                }}
                                onClick={() => handleDelete(e._id)}
                              >
                                Delete
                              </button>
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                  </>
                ) : (
                  <TableRow>
                    <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{data.userName}</TableCell>
                    <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{data.email}</TableCell>
                    <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{data.phoneNo}</TableCell>
                    <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{data.type}</TableCell>
                    <TableCell style={{fontSize: "16px", fontWeight: "100"}} align="center">{data.gender}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <div style={{ textAlign: "center", marginTop: "10rem" }}>
          {/* <img style={{ width: "70%" }} src={empty} alt="empty data" /> */}
          <h3 style={{ position: "relative", top: "-3.5rem" }}>Loading.....</h3>
        </div>
      )}
    </div>
  );
};

export default GetUserData;
