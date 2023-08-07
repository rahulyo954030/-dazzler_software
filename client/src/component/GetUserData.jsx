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

const GetUserData = ({ data, getAllData }) => {
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
            style={{ border: "1px solid white", marginTop: "2rem" }}
            component={Paper}
          >
            <Table
              sx={{ minWidth: 800 }}
              style={{ border: "1px solid white" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow style={{ border: "1px solid white" }}>
                  <TableCell align="center">Username</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">PhoneNo</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  {
                    <>
                      {getId?.type == "admin" ? (
                        <TableCell align="center">Delete</TableCell>
                      ) : null}
                    </>
                  }
                </TableRow>
              </TableHead>
              <TableBody style={{ border: "1px solid #7e22ce" }}>
                {data?.length > 0 ? (
                  <>
                    {data?.map((e) => {
                      if (e?.type === "admin") return;
                      return (
                        <>
                          <TableRow key={e._id}>
                            <TableCell align="center">{e.userName}</TableCell>
                            <TableCell align="center">{e.email}</TableCell>
                            <TableCell align="center">{e.phoneNo}</TableCell>
                            <TableCell align="center">{e.type}</TableCell>
                            <TableCell align="center">{e.gender}</TableCell>
                                  <TableCell align="center">
                                    <button onClick={() => handleDelete(e._id)}>
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
                    <TableCell align="center">{data.userName}</TableCell>
                    <TableCell align="center">{data.email}</TableCell>
                    <TableCell align="center">{data.phoneNo}</TableCell>
                    <TableCell align="center">{data.type}</TableCell>
                    <TableCell align="center">{data.gender}</TableCell>
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
