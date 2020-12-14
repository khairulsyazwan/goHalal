import React from 'react';
import { Box, Button, Grid, Paper, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import * as Yup from "yup";



// Material UI Theme
const useStyles = makeStyles((theme) => ({
grid: {
  width: "100%",
  margin: "30px",
},
paper: {
  padding: theme.spacing(5),
  color: theme.palette.primary.light,
  // textAlign: "center",
  // background: "#303030",
  }
}));

const Register = () => {
  const classes = useStyles();

  return (
        <>
          <Box m={8}>
            <Typography variant="h3">
              <Paper className={classes.paper}>
              Register
              </Paper>
            </Typography>
          </Box>
          <Box m={10}>
            <Typography variant="subtitle1">
              Thank you for joining us! Please register by completing the information below.
            </Typography>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={8} md={3}>
            {/* <Paper className={classes.paper}> */}
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
            {/* </Paper> */}
            </Grid>
            <Grid item xs={9} md={3}>
            {/* <Paper className={classes.paper}> */}
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            {/* </Paper> */}
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={8} md={3}>
            {/* <Paper className={classes.paper}> */}
            <TextField
              autoComplete="contact"
              name="contact"
              variant="outlined"
              required
              fullWidth
              id="contact"
              label="Contact"
              // autoFocus
            />
            {/* </Paper> */}
            </Grid>
            <Grid item xs={8} md={3}>
            {/* <Paper className={classes.paper}> */}
            <TextField
              autoComplete="username"
              name="username"
              variant="outlined"
              required
              fullWidth
              id="username"
              label="Username"
              // autoFocus
            />
            {/* </Paper> */}
            </Grid>
          </Grid>
          <Grid container spacing={3} className={classes.grid}>
            <Grid item xs={8} md={3}>
            {/* <Paper className={classes.paper}> */}
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
            {/* </Paper> */}
            </Grid>
            <Grid item xs={8} md={3}>
            <Button 
            style={{
              maxWidth: '200%', 
              maxHeight: '220%', 
              minWidth: '100%', 
              minHeight: '100%'
            }} 
            
            type="submit" 
            size="large" 
            variant="contained" 
            color="secondary" 
            className={classes.submit}
            // disabled={isSubmitting}
            // onClick={submitForm}
            >Register</Button>
            </Grid>
          </Grid>
          </Box>
        </>
  )
}

export default Register



    /////const register = () => {
    //   console.log("clicked register")
    // }
  // const [loading, setLoading] = useState(false);
  // const [emailExists, setEmailExists] = useState("");

  // async function checkSimilarEmail(email) {
  //   setLoading(true);
  //   if(email !== "") {
  //     try {
  //       let exists = await Axios.get(`/api/v1/auth/${email}`)
  //     } catch (error) {
  //       return
  //     }
  //   }
  // }