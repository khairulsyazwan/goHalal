import React, { useState } from "react";
import { Box, Button, Grid, Paper, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import AppFooter from "../modules/views/AppFooter";
import { Redirect } from "react-router-dom";
import Axios from "axios";

// Material Theme

const useStyles = makeStyles((theme) => ({
  // box: {
  //   margin: "auto",
  // },
  // grid: {
  //   width: "100%",
  //   margin: "30px",
  // },
  paper: {
    margin: "10px",
    padding: theme.spacing(6),
    textAlign: "center",
    color: theme.palette.primary.light,
    // width: "2rem",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [success, setSuccess] = useState(false);

  async function login(values) {
    try {
      let resp = await Axios.post(
        "http://localhost:8000/api/v1/auth/signin/",
        formData
      );
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("userId", resp.data.user_id);
      localStorage.setItem("username", resp.data.username);
      setSuccess(true);
    } catch (error) {
      console.log(error.response);
    }
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    login();
  };

  if (success || localStorage.getItem("token") != null) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Box m={8}>
        <Typography variant="h3">
          <Paper className={classes.paper}>Login</Paper>
        </Typography>
      </Box>
      <Box m={8}>
        <Paper className={classes.paper}>
          <Typography variant="subtitle1">Welcome back!</Typography>
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.grid}
          >
            <Grid item xs={12} md={10}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="username"
                autoComplete="email"
                onChange={onChange}
                autoFocus
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.grid}
          >
            <Grid item xs={12} md={10}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={onChange}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <Button
                // style={{
                //   maxWidth: '200%',
                //   maxHeight: '220%',
                //   minWidth: '100%',
                //   minHeight: '100%'
                // }}
                type="submit"
                size="large"
                variant="contained"
                color="secondary"
                className={classes.submit}
                onClick={onSubmit}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <AppFooter />
    </>
  );
};

export default Login;
// onKeyDown={e => {
//   if (e.key === 'Enter') {
//   handleSubmit();
// }}
