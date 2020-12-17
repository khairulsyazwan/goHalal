import React from "react";
import PropTypes from "prop-types";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import RateReviewIcon from "@material-ui/icons/RateReview";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

const styles = (theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: "#f0efeb",
    // theme.palette.secondary.light
  },
  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
    display: "flex",
    position: "relative",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
    padding: theme.spacing(5, 2),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(3),
  },
  curvyLines: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
  },
});

function PageValues(props) {
  const { classes } = props;

  return (
    <section className={classes.root}>
      <Container className={classes.container}>
        {/* <img
          src="https://www.flaticon.com/svg/static/icons/svg/857/857681.svg"
          className={classes.curvyLines}
          width="90px"
          height="300px"
          alt="curvy lines"
        /> */}
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Paper>
              <div className={classes.item}>
                {/* <img
                className={classes.image}
                src="/static/themes/onepirate/productValues1.svg"
                alt="suitcase"
              /> */}
                <ExploreIcon style={{ fontSize: 50 }} />
                <Typography variant="h5" className={classes.title}>
                  Discover nearby
                </Typography>
                <Typography variant="h6">
                  {"Always wondered about what to eat, and  "}
                  {" and not wanting to travel far? We've got you covered!"}
                </Typography>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper>
              <div className={classes.item}>
                {/* <img
                className={classes.image}
                src="/static/themes/onepirate/productValues2.svg"
                alt="graph"
              /> */}
                <EmojiEmotionsIcon style={{ fontSize: 50 }} />
                <Typography variant="h5" className={classes.title}>
                  New experiences
                </Typography>
                <Typography variant="h6">
                  {"Time for a change in flavour, a little bit of adventure."}
                </Typography>
              </div>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper>
              <div className={classes.item}>
                {/* <img
                className={classes.image}
                src="/static/themes/onepirate/productValues3.svg"
                alt="clock"
              /> */}
                <RateReviewIcon style={{ fontSize: 50 }} />
                <Typography variant="h5" className={classes.title}>
                  Read before you eat
                </Typography>
                <Typography variant="h6">
                  {
                    "Fret not! Reviews will help you decide if it's worth the trip."
                  }
                </Typography>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

PageValues.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageValues);
