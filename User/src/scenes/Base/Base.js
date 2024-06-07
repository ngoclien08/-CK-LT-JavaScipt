import Navbar from "../../components/Navbar/Navbar";
import { Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Base = ({ children }) => {
  let Nav = useNavigate();

  const isTokenExpired = (token) => {
    if (!token) {
      // Nếu không có token, coi như đã hết hạn
      return true;
    }

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Giải mã phần thân của token
      const expirationTime = decodedToken.exp * 1000; // Đổi giây sang mili giây
      const currentTime = new Date().getTime();

      return currentTime > expirationTime;
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
      return true; // Nếu có lỗi giải mã, coi như đã hết hạn
    }
  };
  useEffect(() => {
    if (!localStorage.getItem("tk")) {
      return Nav("/");
    } else {
      const intervalId = setInterval(() => {
        const storedToken = localStorage.getItem("tk");
        const isExpired = isTokenExpired(storedToken);

        if (isExpired) {
          localStorage.clear();
          Nav("/");
        }
      }, 5000);
      // Cleanup function để clear interval khi component unmount
      return () => clearInterval(intervalId);
    }
  }, []);
  return (
    <>
      <div
        className="container"
        style={{ backgroundColor: "whitesmoke", padding: "0px" }}
      >
        <Navbar minHeight={"20vh"}></Navbar>
        <Box minHeight={"94vh"} pb={10} height={"auto"}>
          {" "}
          {children}
        </Box>
      </div>
    </>
  );
};
export default Base;
