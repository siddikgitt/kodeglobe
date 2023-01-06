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
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getNotes } from "../store/user/user.actions";

const Notes = () => {
  const arr = useSelector((store) => store.users.notes);
  console.log(arr);

  useEffect(() => {
    getNotes();
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
        <TextField sx={{ width: "90%" }} placeholder="Search Here" />
        <Button variant="contained">Search</Button>
      </Box>

      <NoteModal />

      <Box style={{ width: "50%", margin: "auto", marginBottom: "50px" }}>
        {arr?.map((el) => (
          <Card
          key={el.id}
            style={{
              border: "1px solid #2852f1",
              marginBottom: "20px",
            }}
          >
            <CardContent>
              <Typography variant="h5">{el.title}</Typography>
              <Typography variant="h6" sx={{ fontSize: 14, marginTop: "7px" }}>
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
                <Button
                  variant="contained"
                  style={{
                    fontSize: "11px",
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  style={{
                    backgroundColor: "red",
                    fontSize: "11px",
                  }}
                >
                  Delete
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Notes;
