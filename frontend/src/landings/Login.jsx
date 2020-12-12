import React from 'react'
import { Box, Button, Container, FormRow, Grid, Link, Paper, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


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
  padding: theme.spacing(6),
  textAlign: "center",
  color: theme.palette.primary.light,
  // background: "#303030",
  }
}));

function Login() {
  const classes = useStyles();
  return (
    <>
      <Box m={10}>
        <Typography variant="h3">
          <Paper className={classes.paper}>
          Login
          </Paper>
        </Typography>
      </Box>
      <Box m={8}>
        <Paper className={classes.paper}>
        <Typography variant="subtitle1">
          Welcome back!
        </Typography>
      <Grid container spacing={3} direction="column" alignItems="center" justify="center" className={classes.grid}>
        <Grid item xs={12} md={10}>
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
      </Grid>
      <Grid container spacing={3} direction="column" alignItems="center" justify="center" className={classes.grid}>
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
        />
        </Grid>
      </Grid>
      </Paper>
      </Box>
    </>
  )
}

export default Login
