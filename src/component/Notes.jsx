import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Input,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import NoteModal from "./NoteModal";
import { app, database } from "../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getNotes } from "../store/user/user.actions";
import EditModal from "./EditModal";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
import { ToastContainer } from "react-toastify";

const Notes = () => {

  const token = useSelector((store) => store.users.accessToken);
  const navigate = useNavigate();

  if (token == "") {
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const [search, setSearch] = useState("");
  const db = getFirestore();
  const arr = useSelector((store) => store.users.notes);
  const email = useSelector((store) => store.users.email);
  const dispatch = useDispatch();

  // ------------ TOAST ------------
  const [openToast, setOpenToast] = React.useState(false);
  const [msg, setMsg] = useState("");

  const handleClickToast = () => {
    setOpenToast(true);
  };

  const handleCloseToast = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToast(false);
  };
  
  // ------------ DELETE NOTE ------------

  const deleteNote = async (id) => {
    const res = await deleteDoc(doc(db, email, id)).then(() => {
      dispatch(getNotes(email));
    });
    // alert("Note Deleted Successfully");
    setMsg("Note Deleted Successfully")
    setOpenToast(true);

  };

  // ------------ EDIT NOTE ------------

  const editNote = async (id, title, description) => {
    const docRef = doc(db, email, id);
    let data = {
      title: title,
      description: description,
    };
    const res = await updateDoc(docRef, data).then(() => {
      dispatch(getNotes(email));
    });
    // alert("Note Edited Successfully");
    setMsg("Note Edited Successfully")
    setOpenToast(true);

  };

  useEffect(() => {
    dispatch(getNotes(email));
  }, []);

  return (
    <div>
      <Box
        style={{
          width: "50%",
          margin: "auto",
          marginTop: "111px",
          marginBottom: "25px",
          display: "flex",
          gap: 5,
        }}
      >
        <TextField onChange={(e) => setSearch(e.target.value)} sx={{ width: "100%" }} placeholder="Search Here" />
      </Box>

      <Box style={{ width: "50%", margin: "auto", marginBottom: "50px" }}>
        {arr
          ?.filter((ele) => {
            if (search === "") {
              return ele;
            } else if (
              ele.description.toLowerCase().includes(search.toLowerCase())
            ) {
              return ele;
            }
          })
          .map((el) => (
            <Card
              key={el.id}
              style={{
                border: "1px solid #2852f1",
                marginBottom: "20px",
              }}
            >
              <CardContent>
                <Typography variant="h5">{el.title}</Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 14, marginTop: "7px" }}
                >
                  {el.description}
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    marginTop: "7px",
                  }}
                >
                  <EditModal initTitle={el.title} initDescription={el.description} id={el.id} handleEdit={editNote}/>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "red",
                      fontSize: "11px",
                    }}
                    onClick={() => deleteNote(el.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
      </Box>
      <Toast msg={msg} handleCloseToast={handleCloseToast} openToast={openToast}/>
      <ToastContainer />
      
    </div>
  );
};

export default Notes;
