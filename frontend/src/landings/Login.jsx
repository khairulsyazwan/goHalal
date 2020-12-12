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
  margin: "10px",
  padding: theme.spacing(6),
  textAlign: "center",
  color: theme.palette.primary.light,
  // width: "2rem",
  }
}));

function Login() {
  const classes = useStyles();
  return (
    <>
      <Box m={8}>
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
          autoFocus
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
      <Grid item xs={12} md={10}>
        <Button 
        // style={{
        //   maxWidth: '200%', 
        //   maxHeight: '220%', 
        //   minWidth: '100%', 
        //   minHeight: '100%'
        // }} 
        type="submit" size="large" variant="contained" color="secondary" className={classes.submit}>Login</Button>
        </Grid>
      </Grid>
      </Paper>
      </Box>
    </>
  )
}

export default Login
