import React from 'react'
import { Box, Button, ButtonGroup, Container, Grid, Link, TextField } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Axios from 'axios'
// import { Formik } from "formik";
// import * as Yup from "yup";



// Material Theme

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Register() {
  const classes = useStyles();
  return (
    <>
      <Container>
        <Box m={10}>
          <Typography variant="h4">
            Register Page
          </Typography>
        </Box>
      </Container>
      <Container>
        <Box m={10}>
          <Typography variant="subtitle1">
            Thank you for joining us! Please register by completing the information below.
          </Typography>
        </Box>
<Container component="main" maxWidth="xs">
  <CssBaseline />
    <form className={classes.form} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
              />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
        </Grid>  
        <Grid item xs={12} sm={6}>
          <TextField
                autoComplete="contact"
                name="contact"
                variant="outlined"
                required
                fullWidth
                id="contact"
                label="Contact"
                autoFocus
              />
        </Grid>  
        <Grid item xs={12} sm={6}>
          <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
              />
        </Grid>
        <Grid item xs={6}>
          <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
        </Grid>
        <Grid item md={6}>
          <Button style={{
            maxWidth: '180%', 
            maxHeight: '130%', 
            minWidth: '170%', 
            minHeight: '100%'
          }} 
          size="large" variant="outlined" color="secondary">Register</Button>  
        </Grid>
      </Grid>
    </form>
</Container>
      </Container>
      <Container>
        <Box m={10}>
          <ButtonGroup>
          <Button size="large" variant="contained" color="secondary">Register</Button>
          <Button size="large" variant="contained" color="secondary">Log In</Button>
          </ButtonGroup>
        </Box>
      </Container>
    </>
  )
}

export default Register
