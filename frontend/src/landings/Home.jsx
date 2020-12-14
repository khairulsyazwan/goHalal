import React from "react";
import Grid from "@material-ui/core/Grid";

function Home() {
  return (
    <>
      <Grid container>
        <Grid item md={7}>
          <img
            src="https://images.unsplash.com/photo-1493770348161-369560ae357d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            alt=""
            style={{ width: "100%", height: "90vh" }}
          />
        </Grid>

        <Grid item md={5}>
          Hafiz
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
