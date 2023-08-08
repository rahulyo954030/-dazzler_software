import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./css/signup.css";

let init = {
  userName: "",
  email: "",
  phoneNo: "",
  type: "",
  gender: "",
  passWord: "",
};

export const Signup = () => {
  const [signup, setSignupdata] = useState(init);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupdata({ ...signup, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/signup", signup)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 409){
          alert(err.response.data.msg);
        }
         else if(err.response.status === 500){
          alert(err.response.data.msg);
        }
        else if(err.response.status === 400){
          alert(err.response.data.msg)
        }
        else{
          alert(err.response.data.msg);
        }
      });
  };

  return (
    <>
      <div className="signup_main_cont">
        <h1
          style={{ fontWeight: "bold", fontSize: "21px", paddingTop: "1rem" }}
        >
          Register User
        </h1>
        <form onSubmit={handleSubmit}>
          <br />
          <input
            type="text"
            name="userName"
            className="inp1"
            placeholder="UserName"
            onChange={handleChange}
            value={signup.userName}
            required
          />
          <br />
          <input
            type="text"
            name="email"
            className="inp2"
            placeholder="Email"
            onChange={handleChange}
            value={signup.email}
            required
          />
          <br />
          <input
            type="number"
            name="phoneNo"
            className="inp2"
            placeholder="PhoneNo"
            onChange={handleChange}
            value={signup.phoneNo}
            required
          />
          <select required className="inp2" name="type" onChange={handleChange}>
            <option value="">Type</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <br />
          <select required className="inp2" name="gender" onChange={handleChange}>
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <br />
          <input
            type="password"
            name="passWord"
            className="inp2"
            placeholder="PassWord"
            onChange={handleChange}
            value={signup.passWord}
            required
          />
          <br />
          <input className="inp5" type="submit" value="Sign Up" />
        </form>
        <p className="my-4">
          Already have an account{" "}
          <Link className="text-blue-700	" to={"/"}>
            Login
          </Link>
        </p>
      </div>
    </>
  );
};
