import React, { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const submitData = {
  email: "",
  password: "",
};

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  // const token = useSelector((store) => store.users.accessToken);
  const token = localStorage.getItem("kodeglobe");
  useEffect(() => {
    if (token) {
      navigate("/notes");
    }

  }, [])

  const [data, setData] = useState(submitData);

  const handleChange = (e) => {
    const { name: key, value } = e.target;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        toast.success("Signup Successful", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setTimeout(() => {
          navigate("/");
          
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode, error.message);
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl
          style={{
            width: "100%",
            margin: "auto",
            marginTop: "111px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            name="email"
            onChange={handleChange}
            style={{ width: "40%" }}
            label="Email"
            type="email"
          />
          <br />
          <TextField
            name="password"
            onChange={handleChange}
            style={{ width: "40%" }}
            label="Password"
            type="password"
          />
          <br />
          <Button type="submit" style={{ width: "40%" }} variant="contained">
            Signup
          </Button>
        </FormControl>
        <ToastContainer autoClose={2000} hideProgressBar={true}/>

      </form>
    </div>
  );
};

export default Signup;
