import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Paper } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        goHalal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({
  isAuth,
  setIsAuth,
  isAdmin,
  setIsAdmin,
  isOwner,
  setIsOwner,
  login,
  setLogin,
}) {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function login() {
    try {
      let resp = await Axios.post(
        // "http://localhost:8000/api/v1/auth/signin/",
        "/api/v1/auth/signin/",
        formData
      );
      // console.log(resp.data);
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("userId", resp.data.user_id);
      localStorage.setItem("username", resp.data.username);
      if (resp.data.username == "admin") {
        setIsAdmin(true);
      }
      setIsAuth(true);
      setLogin(true);
      // console.log(resp);
    } catch (error) {
      console.log(error.response);
    }
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login();
  };

  if (isAuth && isAdmin && localStorage.getItem("token") != null) {
    return <Redirect to="/admin" />;
  } else if (isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Paper>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              autoComplete="email"
              autoFocus
              onChange={onChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={onChange}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>

        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Paper>
  );
}