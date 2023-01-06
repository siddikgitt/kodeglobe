import React, { useState } from "react";
import { Button, FormControl, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { app } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const submitData = {
  email: "",
  password: "",
};

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const token = useSelector((store) => store.users.accessToken);
  useEffect(() => {
    if (token != "") {
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
        alert("Signup Successful")
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode, error.message);
        alert(error.message);
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
      </form>
    </div>
  );
};

export default Signup;
