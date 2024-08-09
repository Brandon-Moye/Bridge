import { Button, Modal, Box, styled } from "@mui/material";

const GreenButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#48a684",
  color: "#fff",
  fontFamily: "'Lato', sans-serif",
  maxWidth: "3rem",
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
  maxWidth: "3rem",
  "&:hover": {
    backgroundColor: "#9f8449",
    color: "#fff",
  },
}));

const NavButton = styled(Button)(({ theme }) => ({
  fontFamily: "'Lato', sans-serif",
}));

const CustomBox = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: "0.5rem",
  gridTemplateColumns: "1fr 1fr",
  position: "absolute",
  top: "30%",
  left: "22.5%",
  transform: "translate(-50%, -50%)",
  padding: "0.5rem",
  width: "25rem",
  backgroundColor: "#fff",
  borderRadius: "10px",
}));

export {
  GreenButton,
  RedButton,
  BlueButton,
  YellowButton,
  NavButton,
  CustomBox,
};
