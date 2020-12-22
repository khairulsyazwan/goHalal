import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  cardContent: {
    flexGrow: 1,
  },
}));

function Pages({ restaurants, loading }) {
  const classes = useStyles();
  //   console.log(loading);
  if (!loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <Grid container justify="center">
      <ul>
        {restaurants.map((card, index) => (
          <Grid item key={index}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  <NavLink
                    to={`/restaurant/${card.restaurant_id}`}
                    style={{ textDecoration: "none" }}
                  >
                    {card.name}
                  </NavLink>
                </Typography>
                <Typography variant="body1">{card.address}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </ul>
    </Grid>
  );
}

export default Pages;
