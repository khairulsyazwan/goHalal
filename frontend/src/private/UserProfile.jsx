import React from 'react'
import { Avatar, Button, Box, Grid, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";


// Material Theme

const useStyles = makeStyles((theme) => ({

large: {
  margin: "20%",
  padding: theme.spacing(8),
},
user: {
  marginLeft: "60px",
}
}));

const UserProfile = () => {
  const classes = useStyles();
  return (
    <>
      <Grid container direction="column" item xs={4}>
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
</Grid>
    </>
  )
}

export default UserProfile
