import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

function Home() {
  return (
    <>
      <Grid container justify="center" alignItems="center">
        <Grid
          container
          justify="center"
          alignItems="center"
          md={7}
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1493770348161-369560ae357d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80)",
            height: "85vh",
            width: "100vw",
          }}
        >
          <Grid item>
            <Typography variant="h1" component="h2" align="center">
              Title here
            </Typography>
          </Grid>
        </Grid>

        <Grid container md={5} justify="center" alignItems="center">
          <Grid item>
            <Typography variant="h3" component="h2" align="center">
              Find halal certified food in your area.
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              Find Now
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
