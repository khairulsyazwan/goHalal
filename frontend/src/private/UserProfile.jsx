import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
// import { PrivateRoute } from '../private/PrivateRoute';
// import { AuthContext } from "../private/Auth";
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Box, Portal, Typography, Paper, Grid, TextField } from "@material-ui/core/";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core/styles";
import AppFooter from '../modules/views/AppFooter';
// import Axios from './axios';

// Material Theme

const useStyles = makeStyles((theme) => ({
// spacing: [0, 2, 3, 5, 8],

large: {
  margin: "5%",
  padding: "80px",
},
user: {
  display: "flex",
  flexDirection: "column",
  width: "130px"
},
butt: {
  width: "fit-content"
},
title: {
  fontSize: 14,
},
pos: {
  marginBottom: 12,
},
cardlinks: {
  marginTop: "5%",
  marginBottom: "5%"
},
  button: {
  marginTop: theme.spacing(8),
  marginLeft: theme.spacing(1),
},
edit: {
  margin: "5%"
}
}));


const UserProfile = (props) => {
  // Material UI Theme
  const classes = useStyles();
  const { history } = props;
  let historyRoute = useHistory();
  const token = localStorage.getItem('token');
  // console.log(token)
  const username = localStorage.getItem('username');
  let { id } = useParams();


  const [isAuth, setIsAuth] = useState(false);
  const [form, setForm] = useState({});
  const [editProfile, setEditProfile] = useState(false);
  const [ownProfile, setOwnProfile] = useState(false);
  // const [activeStep, setActiveStep] = useState(0);
  const container = useRef(null);

  if (isAuth && localStorage.getItem('token') != null) {
    historyRoute.push("/");;
    setIsAuth(true)
  }
//////////////////////////////////////////////////////////////
  const handleSave = () => {
    setEditProfile(editProfile());
  };

    const handleBack = () => {
    setEditProfile(editProfile - 1);
  };

  const handleClick = () => {
  setEditProfile(!editProfile);
  };

  return (
  <>
    <Card className={classes.root}>
          {/* <CardActionArea> */}
    <Grid className={classes.cardlinks} container spacing={2}>
            <Grid item xs={12} md={1}></Grid>
    <Grid item xs={12} md={2}>
      <CardMedia/>
        <Avatar alt="avatar" src="/static/images/avatar/1.jpg" className={classes.large} />
          <CardContent>
          {/* wadafok here m8 */}
          <Typography gutterBottom variant="h5" component="h2">
            {username}
          </Typography>
        <Button className={classes.butt} variant="contained" color="secondary" type="button" onClick={handleClick}>
        {editProfile ? 'Edit Profile' : 'Edit Profile'}
        </Button>
      {/* <div ref={container} /> */}
          </CardContent>
    </Grid>
    <Grid item xs={12} md={6}>
    {editProfile ? (
    <Portal container={container.current}>
      <Paper elevation={3}>
        <form>
          <Typography variant="h5" gutterBottom>
            Edit Profile
          </Typography>
          <Grid container spacing={3} className={classes.edit}>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                // variant="outlined"
                // fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                // variant="outlined"
                // fullWidth
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="username"
                name="username"
                label="Username"
                // variant="outlined"
                // fullWidth
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email Address"
                // variant="outlined"
                // fullWidth
                autoComplete="email-address"
              />
            </Grid>
          </Grid>
            <Button 
            className={classes.button} 
            onClick={handleBack}>
            Back
            </Button>
            <Button 
            className={classes.button} 
            onClick={handleSave}>
            Save
            </Button>
        </form>
      </Paper>
    </Portal>
    ) : null}
    <div ref={container} />
    </Grid>

  </Grid>
        {/* </CardActionArea> */}
  </Card>
        {/* links to view */}
  <Grid className={classes.cardlinks} container spacing={2}>
            <Grid item xs={12} md={2}>
              
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper>
            <Card className={classes.root}>
            <CardActionArea>
            <CardMedia/>
        <CardContent>
          <Typography variant="h3" component="h3">
            My Favorite Restaurants
          </Typography>
          <Typography variant="body2" component="p">
            View all your favorites here
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Go here</Button>
        </CardActions>
        </CardActionArea>
      </Card>
          </Paper>
            </Grid>
            <Grid item xs={12} md={2}>
              
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia/>
        <CardContent>
          <Typography variant="h3" component="h3">
            My Restaurant Reviews
          </Typography>
          <Typography variant="body2" component="p">
            All the list of reviews you have
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Go Here</Button>
        </CardActions>
          </CardActionArea>
        </Card>
      </Paper>
    </Grid>
  </Grid>
  <AppFooter />
  </>
  )
}

export default UserProfile


  // const setToken = (data) => {
  //     localStorage.setItem("token", JSON.stringify(data));
  //     setAuthToken(data);
  //   }


        /* <Grid container direction="column" item xs={4}>
        <Grid
          item
          xs
          className={classes.outerColumn}
          style={{ display: "flex", alignItems: "center" }}
        >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} />
        <Typography>AVATAR</Typography>
        </Grid>
        <Grid
          item
          xs
          className={classes.user}
          direction="column"
          align="left"
          // style={{ display: "flex", justifyContent: "flex-end" }}
          >
          <Typography>Username</Typography>
          <Button
            // size="large"
            variant="contained" 
            color="secondary" 
            >Edit Profile</Button>
        </Grid>
      </Grid>

<Grid container direction="column" item xs={4} align="center">
  <Grid
    item
    container
    className={classes.centerColumn}
    display="flex"
    justify="center"
  >
    <Typography>Center Top</Typography>
  </Grid>
  <Grid
    item
    container
    className={classes.centerColumn}
    direction="column"
    display="flex"
    justify="center"
  >
    <Typography>Center Center</Typography>
  </Grid>
  <Grid
    item
    className={classes.centerColumn}
    container
    direction="row"
    alignItems="flex-end"
    justify="center"
  >
    <Typography>Center Bottom</Typography>
  </Grid>
</Grid> */


    /* <Grid item xs={12} md={6} >
    {editProfile ? (
    <Portal container={container.current}>
      <Paper elevation={3}>
        <form>
            <Typography variant="h6" gutterBottom>
              Edit Profile
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                // fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                // fullWidth
                autoComplete="family-name"
              />
            </Grid>
            <Button className={classes.button} onClick={handleBack}>Back</Button>
          </Grid>
        </form>
      </Paper>
    </Portal>
    ) : null}
    </Grid> */


    /* <Grid item xs={12} md={6} >
      <Paper elevation={3}>
        <form>
            <Typography variant="h6" gutterBottom>
              Edit Profile
            </Typography>
            <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                // fullWidth
                autoComplete="given-name"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                // fullWidth
                autoComplete="family-name"
              />
            </Grid>
            <Button className={classes.button} onClick={handleBack}>Back</Button>
          </Grid>
        </form>
      </Paper>
    </Grid> */
