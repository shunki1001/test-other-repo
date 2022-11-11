import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../context/DataContext";
import logTop from "../img/log-tp.png";

const Complete = () => {
  const { appointmentUrl, whereFrom } = useContext(DataContext);
  return (
    <div
      className="image-container set-full-height"
      style={{ paddingTop: "100px" }}
    >
      <Box
        sx={{
          margin: "0 auto",
          width: "50%",
          minWidth: "310px",
          minHeight: "310px",
          backgroundColor: "#fff",
          borderRadius: "6px",
          boxShadow:
            "0 16px 24px 2px rgb(0 0 0 / 14%), 0 6px 30px 5px rgb(0 0 0 / 12%), 0 8px 10px -5px rgb(0 0 0 / 20%)",
        }}
      >
        <Box sx={{ padding: "10px 0" }}>
          <Box
            sx={{
              "& p": { fontSize: "14px", color: "rgba(0,0,0, 0.87)" },
              margin: "30px 10px 40px",
              textAlign: "center",
              padding: "20px 0px",
            }}
          >
            <Typography>商談用のURLを発行しました。</Typography>
            <Typography>下記URLからアクセスお願い致します。</Typography>
            <Box>
              <Button
                variant="contained"
                sx={{
                  my: 3,
                  width: "70%",
                  textTransform: "none",
                  borderRadius: "10px",
                }}
                onClick={() => (window.location.href = appointmentUrl)}
              >
                {appointmentUrl}
              </Button>
            </Box>
            <Box>
              <Button
                fullWidth
                sx={{ my: 3, textDecoration: "underline" }}
                onClick={() => (window.location.href = `https://${whereFrom}`)}
              >
                元のページへ戻る
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <div className="footer">
        <div className="container text-center text-white">
          supported by
          <a href="https://non-appoint.com/">
            <img src={logTop} className="footer-logo" alt="logo" />
          </a>
          <br />
          © 2022 My alarm All Rights Reserved. <br />
          運営会社:<a href="https://myalarm.site/company">My Alarm株式会社</a>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Complete;
