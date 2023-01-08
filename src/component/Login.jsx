import { Button, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { handleLogin } from "../store/user/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const submitData = {
  email: "",
  password: "",
};

const Login = () => {
  const token = useSelector((store) => store.users.accessToken);
  const navigate = useNavigate();
  useEffect(() => {
    if (token != "") {
      navigate("/notes");
    }
  }, []);

  if (token != "") {
    setTimeout(() => {
      navigate("/notes");
      
    }, 2000);
  }

  const [data, setData] = useState(submitData);
  const auth = getAuth();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name: key, value } = e.target;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(handleLogin(data.email, data.password));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl
          style={{
            width: "100%",
            height: "100%",
            margin: "auto",
            marginTop: "111px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            style={{ width: "40%" }}
            onChange={handleChange}
            name="email"
            label="Email"
            type="email"
          />
          <br />
          <TextField
            onChange={handleChange}
            style={{ width: "40%" }}
            name="password"
            label="Password"
            type="password"
          />
          <br />
          <Button type="submit" style={{ width: "40%" }} variant="contained">
            Login
          </Button>
        </FormControl>
        <ToastContainer autoClose={2000} hideProgressBar={true}/>
      </form>
    </div>
  );
};

export default Login;
