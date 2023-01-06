import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { FormControl, TextField } from "@mui/material";

import { app, database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../store/user/user.actions";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const submitData = {
  title: "",
  description: "",
};

const NoteModal = () => {
  const email = useSelector((store) => store.users.email);
  const collectionRef = collection(database, email);

  const dispatch = useDispatch();
  const [data, setData] = useState(submitData);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name: key, value } = e.target;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    addDoc(collectionRef, {
      title: data.title,
      description: data.description,
    })
      .then(() => {
        getNotes();
        alert("Note Added Succussfully");
        handleClose();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div>
      <Button
        style={{
          width: "50%",
          margin: "auto",
          marginBottom: "50px",
          display: "flex",
          gap: 5,
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Add New Note
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <form onSubmit={handleSubmit}>
              <FormControl
                style={{
                  width: "100%",
                  height: "100%",
                  margin: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  onChange={handleChange}
                  name="title"
                  style={{ width: "100%" }}
                  label="Title"
                  type="text"
                />
                <br />
                <TextField
                  onChange={handleChange}
                  name="description"
                  style={{ width: "100%" }}
                  label="Description"
                  type="text"
                />
                <br />
                <Button
                  style={{ width: "100%" }}
                  type="submit"
                  variant="contained"
                >
                  Add
                </Button>
              </FormControl>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default NoteModal;
