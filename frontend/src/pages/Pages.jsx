import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Grid, Link, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
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
    <ul className="list-group mb-4">
      {restaurants.map((card, index) => (
        <Grid item key={index}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                <Link href={`/restaurant/${card.id}`}>{card.name}</Link>
              </Typography>
              <Typography>{card.address}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </ul>
  );
}

export default Pages;
