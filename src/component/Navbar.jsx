import React from "react";
import Box from "@mui/material/Box";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import logo from "../Asset/logo.png";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../store/user/user.actions";
import NoteModal from "./NoteModal";

const Navbar = () => {
  const token = useSelector((store) => store.users.accessToken);

  const [mobileDisplay, setMobileDisplay] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          position: "fixed",
          zIndex: 1,
          top: 0,
          padding: "1rem",
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ ":hover": { cursor: "pointer" } }}
          onClick={() => navigate("/")}
          style={{ display: "flex", gap: 5, alignItems: "center" }}
        >
          <Avatar alt="Logo" src={logo} />
          <Typography variant="h5">KodeGlobe</Typography>
        </Box>
        <Box
          sx={{
            // width: "20%",
            width: {
              xs: "45%",
              sm: "25%",
              md: "20%",
              lg: "15%",
              xl: "10%",
            },
            display: {
              xs: "flex",
              sm: "flex",
              md: "flex",
              lg: "flex",
              xl: "flex",
            },
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {token == "" ? (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Typography
                onClick={() => navigate("/")}
                sx={{ ":hover": { color: "#2852f1", cursor: "pointer" } }}
                variant="h6"
              >
                Login
              </Typography>
              <Typography
                onClick={() => navigate("/signup")}
                sx={{ ":hover": { color: "#2852f1", cursor: "pointer" } }}
                variant="h6"
              >
                Signup
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: "0.5rem" }}>
              <Button
              sx={{padding: 0}}
                onClick={() => {
                  dispatch(handleLogout());
                  navigate("/");
                }}
                variant="outlined"
              >
                Logout
              </Button>
              <NoteModal />
            </Box>
          )}
        </Box>

        {/* <Box
          sx={{
            width: "15%",
            display: {
              xs: "block",
              sm: "block",
              md: "none",
              lg: "none",
              xl: "none",
            },
            alignItems: "center",
            gap: "1rem",
          }}
          onClick={() => setMobileDisplay(!mobileDisplay)}
        >
          {mobileDisplay ? <CloseRoundedIcon /> : <MenuRoundedIcon />}
        </Box> */}
      </Box>
      {mobileDisplay && (
        <Box
          width={"fit-content"}
          margin={"auto"}
          mt={"90px"}
          height="fit-content"
        >
          <List margin="auto" width="fit-content">
            {token == "" ? (
              <Box>
                <ListItem>
                  <ListItemText
                    onClick={() => {
                      navigate("/");
                      setMobileDisplay(!mobileDisplay);
                    }}
                    primary="Login"
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    onClick={() => {
                      navigate("/signup");
                      setMobileDisplay(!mobileDisplay);
                    }}
                    primary="Signup"
                  />
                </ListItem>
              </Box>
            ) : (
              <ListItem>
                <ListItemText
                  onClick={() => {
                    dispatch(handleLogout());
                    navigate("/");
                    setMobileDisplay(!mobileDisplay);
                  }}
                  primary="Logout"
                />
              </ListItem>
            )}
          </List>
        </Box>
      )}
    </div>
  );
};

export default Navbar;
