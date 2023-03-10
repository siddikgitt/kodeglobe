import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import { GET_NOTE, USER_LOGIN, USER_LOGOUT } from "./user.actionType";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const auth = getAuth();

export const handleLogin = (email, password) => (dispatch) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      // alert("Signin Successful");
      toast.success("Login Successful", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch({ type: USER_LOGIN, payload: user });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // alert(errorMessage);
      toast.error(errorMessage, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    });
};

export const getNotes = (email) => (dispatch) => {
  const collectionRef = collection(database, email);
  let temp = [];
  getDocs(collectionRef).then((res) => {
    res.docs.map((el) => {
      temp.push({ ...el.data(), id: el.id });
    });
    dispatch({ type: GET_NOTE, payload: temp });
  });
};

export const handleLogout = () => (dispatch) => {
  dispatch({ type: USER_LOGOUT });
};
