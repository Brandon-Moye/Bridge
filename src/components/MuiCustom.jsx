import { Button, Modal, Box, styled } from "@mui/material";

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#48a684",
  color: "#fff",
  fontFamily: "'Lato', sans-serif",
  "&:hover": {
    backgroundColor: "#32745c",
    color: "#fff",
  },
}));

const RedButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ef565b",
  color: "#fff",
  fontFamily: "'Lato', sans-serif",
  maxWidth: "3rem",
  "&:hover": {
    backgroundColor: "#a73c40",
    color: "#fff",
  },
}));

const BlueButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#5585c5",
  color: "#fff",
  fontFamily: "'Lato', sans-serif",
  maxWidth: "3rem",
  "&:hover": {
    backgroundColor: "#3b5d8a",
    color: "#fff",
  },
}));

const YellowButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#e3bd68",
  color: "#fff",
  fontFamily: "'Lato', sans-serif",
  "&:hover": {
    backgroundColor: "#9f8449",
    color: "#fff",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Lato', sans-serif",
}));

export { GreenButton, RedButton, BlueButton, YellowButton, NavButton };
