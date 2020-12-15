import React from 'react';
import PropTypes from 'prop-types';
import { Container, Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    display: 'flex',
    overflow: 'hidden',
    backgroundColor: "#f0efeb",
    // theme.palette.secondary.light
  },
  container: {
    marginTop: theme.spacing(15),
    marginBottom: theme.spacing(30),
    display: 'flex',
    position: 'relative',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: 'center',
    padding: theme.spacing(0, 5),
  },
  image: {
    height: 55,
  },
  title: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  curvyLines: {
    pointerEvents: 'none',
    position: 'absolute',
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
            <div className={classes.item}>
              {/* <img
                className={classes.image}
                src="/static/themes/onepirate/productValues1.svg"
                alt="suitcase"
              /> */}
              <Typography variant="h6" className={classes.title}>
                The best halal restaurants nearby
              </Typography>
              <Typography variant="h5">
                {'From the latest local foods to the iconic restaurants, '}
                {' just a few stops away from your home.'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              {/* <img
                className={classes.image}
                src="/static/themes/onepirate/productValues2.svg"
                alt="graph"
              /> */}
              <Typography variant="h6" className={classes.title}>
                New experiences with us
              </Typography>
              <Typography variant="h5">
                {'Your Sundays will not be alike with finding foods around you'}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={classes.item}>
              {/* <img
                className={classes.image}
                src="/static/themes/onepirate/productValues3.svg"
                alt="clock"
              /> */}
              <Typography variant="h6" className={classes.title}>
                Exclusive Reserve Space
              </Typography>
              <Typography variant="h5">
                {'By registering, you will access specially reserved space'}
                {' from the owner themselves!'}
              </Typography>
            </div>
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