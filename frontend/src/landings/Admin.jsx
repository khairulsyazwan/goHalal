import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, Typography, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function Admin() {
  const [request, setRequest] = useState();

  useEffect(() => {
    getTable();
    return () => {};
  }, []);

  function getTable() {
    // try {
    //     let resp = await axios.get(
    //       `http://localhost:8000/api/v1/restaurants/${id}`
    //     );
    //     let info = resp.data.restaurant;
    //     // console.log(resp);
    //     setSingle({ info });
    //     setisLoaded(true);
    //   } catch (err) {
    //     console.log(err.response);
    //   }

    console.log("hello");
    //   setRequest()
  }

  const url =
    "https://images.unsplash.com/photo-1496167117681-944f702be1f4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80";

  const useStyles = makeStyles((theme) => ({
    header: {
      backgroundImage: `url(${url})`,
      height: "30vh",
      position: "center",
      backgroundSize: "cover",
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Grid
        container
        className={classes.header}
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Grid container justify="center">
            <Typography variant="h2" color="textSecondary">
              Welcome back Admin!
            </Typography>
          </Grid>

          <Grid container justify="center" style={{ marginTop: "5px" }}>
            <Chip
              color="primary"
              label="5 pending requests"
              style={{ padding: "10px" }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Container>
          {/* <ul className="list-group mb-4">
            <Grid container justify="center">
              <Grid item xs={8}>
                {reviews.map((card, index) => (
                  <Grid item xs={12} key={index}>
                    <Card
                      className={classes.card}
                      style={{ marginTop: "10px" }}
                    >
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.review_title}
                        </Typography>
                        <Typography>{stars(card.average_rating)}</Typography>
                        <Typography>
                          {card.review_body} - {card.user.username}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </ul> */}
        </Container>
      </Grid>
    </>
  );
}

export default Admin;
