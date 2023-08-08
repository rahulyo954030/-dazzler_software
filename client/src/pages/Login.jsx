import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "./css/login.css";
import eyeimg1 from "./eyeimg/eyeimg1.jpeg"
import eyeimg2 from "./eyeimg/eyeimg2.jpeg"

let init = {
  email: "",
  passWord: "",
};

export const Login = () => {
  const [login, setlogin] = useState(init);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChanged = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/auth/login", login)
      .then((res) => {
        console.log(res);
        localStorage.setItem(
          "pvtroute",
          JSON.stringify({
            isLoggin: true,
            userId: res.data.userId,
            token: res.data.accessToken,
            name: res.data.userName,
            type: res.data.type,
            // passWord: login.passWord,
          })
        );
        setlogin(res.data);
        setlogin({ ...init });
        if(res.status === 200){
          alert(res.data.msg);
        }
        navigate("/userPage");
      })
      .catch((err) => {
        console.log("error", err);
         if(err.response.status === 400){
          alert(err.response.data.msg);
        }
        else if(err.response.status === 500){
          alert(err.response.data.msg);
        }
      });
  };
  return (
    <>
      <div className="login_main_container my-7">
        <h1
          style={{ fontWeight: "bold", paddingTop: "2rem", fontSize: "21px" }}
        >
          Login User
        </h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="email"
            className="inpu1"
            placeholder="Email"
            onChange={handleChanged}
            value={login.email}
            required
          />
          <br />
          <div className="show_hide_password_div">
            <input
             type={showPassword ? "text" : "password"}
            name="passWord"
            className="inpu2"
            placeholder="PassWord"
            onChange={handleChanged}
            value={login.passWord}
            required
            />
            <span
              className="show_hide_password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <img src={eyeimg2} alt="eyehide" />
              ) : (
                <img src={eyeimg1} alt="eyeshow" />
              )}
            </span>
          </div>
          <br />
          <input className="inpu4" type="submit" value="Log In" />
        </form>
        <p className="my-4">
          Create an account{" "}
          <Link className="text-blue-700	" to={"/signup"}>
            Signup
          </Link>
        </p>
      </div>
    </>
  );
};
