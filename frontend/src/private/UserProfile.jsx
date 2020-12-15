import React, { useState } from 'react'
import { Avatar, Button, Box, Typography, Paper, Grid } from "@material-ui/core/";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core/styles";
import AppFooter from '../modules/views/AppFooter';


// import Axios from 'axios';




// Material Theme

const useStyles = makeStyles((theme) => ({
// spacing: [0, 2, 3, 5, 8],

large: {
  margin: "5%",
  padding: "80px",
  // padding: theme.spacing(8),
},
user: {
  // margin: "15%",
  // width: "50%",
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
}
}));


const UserProfile = () => {
  const [light, setLight] = useState(true);
  const classes = useStyles();

  const [getAppToken, setgetAppToken] = useState({})
  const [user, setUser] = useState({
    user: null,
    found: false,
  })
  
  const [showEditProfile, setEditProfile] = useState(false);



  return (
    <>

      {/* <Grid container direction="column" item xs={4}>
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
</Grid> */}
        <Card className={classes.root}>
          {/* <CardActionArea> */}
          <Grid className={classes.cardlinks} container spacing={2}>
            <Grid item xs={12} md={1}></Grid>
            <Grid item xs={12} md={2}>
            <CardMedia/>
            <Avatar alt="avatar" src="/static/images/avatar/1.jpg" className={classes.large} />
          <CardContent>
          {/* wadafok here m8 */}
            {/* <div className={classes.user}> */}
            <Box ml={5}>
          <Typography gutterBottom variant="h5" component="h2">
            Username
          </Typography>
          <Button
          className={classes.butt}
            // size="large"
            variant="contained" 
            color="secondary" 
            >Edit Profile
          </Button>
            </Box>
            {/* </div> */}
          </CardContent>
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
          <Grid item xs={12} md={2}>
            
          </Grid>
        </Grid>
        <AppFooter />
    </>
  )
}

export default UserProfile
