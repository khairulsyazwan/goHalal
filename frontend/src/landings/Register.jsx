import React from 'react';
// import {render} from 'react-dom';
import { Box, Button, Grid, Paper, TextField, FormControlLabel } from '@material-ui/core';
import { Switch } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
// import Axios from 'axios';
import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";



// Material Theme

const useStyles = makeStyles((theme) => ({
grid: {
  width: "100%",
  margin: "30px",
},
paper: {
  padding: theme.spacing(5),
  // textAlign: "center",
  color: theme.palette.primary.light,
  // background: "#303030",
  }
}));

const Register = () => {
  const classes = useStyles();

  // <Formik
  //   iniialValues={{
  //     username: '',
  //     email: '',
  //     password: '',
  //   }}
  //   validate={(values) => {
  //     const errors = {};
  //     if (!values.email) {
  //       errors.email = 'Required';
  //     } else if (
  //       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  //     ) {
  //       errors.email = 'Invalid email address';
  //     }
  //     return errors;
  //   }}
  //   onSubmit={(values, {setSubmitting}) => {
  //     setTimeout(() => {
  //       setSubmitting(false);
  //       alert(JSON.stringify(values, null, 2))
  //     }, 500);
  //   }}>

  // {({submitForm, isSubmitting}) => (
  //       <Form>
  //         <Box margin={1}>
  //           <Field
  //             name="email"
  //             type="email"
  //             label="Email"
  //             helperText="Please Enter Email"
  //           />
  //         </Box>
  //         <Box margin={1}>
  //           <Field
  //             component={TextField}
  //             type="password"
  //             label="Password"
  //             name="password"
  //           />
  //         </Box>
  //         <Box margin={1}>
  //           <FormControlLabel
  //             control={
  //               <Field component={Switch} type="checkbox" name="rememberMe" />
  //             }
  //             label="Remember Me"
  //           />
  //         </Box>
  //       </Form>
  // )}
  //   </Formik> 
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