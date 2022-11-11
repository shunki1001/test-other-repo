import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { DataContext } from "../contexts/DataContext";

import logo from "../img/log-tp.png";

export default function SignIn() {
  const { signin, errorLogin } = React.useContext(DataContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    signin(data.get("email"), data.get("password"));
  };

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        height: "100%",
        py: "5vh",
        backgroundColor: "#2469B3",
      }}
    >
      <Box width="200px" sx={{ margin: "0px auto 2em" }}>
        <img src={logo} alt="logo" style={{ width: "100%" }} />
      </Box>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          backgroundColor: "#ffffff",
          minHeight: "60vh",
          height: "auto",
          py: 12,
          boxShadow: "0px 8px 23px 0px #000000A3",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "25px" }}>ログイン</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                my: 2,
                backgroundColor: "#f5f5f5",
                "& label": { fontSize: "16px" },
                "& div input": { fontSize: "17px" },
                "& input": { fontWeight: "400" },
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="standard"
              InputProps={{
                disableUnderline: true,
              }}
              sx={{
                my: 2,
                backgroundColor: "#f5f5f5",
                "& label": { fontSize: "16px" },
                "& div input": { fontSize: "17px" },
                "& input": { fontWeight: "400" },
              }}
            />
            {errorLogin && (
              <Typography variant="caption" color="error">
                メールアドレスかパスワードが間違っています。
              </Typography>
            )}
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <Button
                type="submit"
                variant="contained"
                sx={{ margin: "30px 0px 16px", padding: "11px 63px" }}
              >
                ログイン
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "250px",
          margin: "32px auto",
        }}
      >
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" sx={{ color: "#fff" }}>
              利用規約
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" sx={{ color: "#fff" }}>
              プライバシーポリシー
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
