import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Container,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import TabPanel from "./TabPanel";
import StarRateIcon from "@material-ui/icons/StarRate";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";

function Restaurant({ isAuth }) {
  const [single, setSingle] = useState({});
  const [isLoaded, setisLoaded] = useState(false);
  const [reviews, setReviews] = useState();
  // const [formData, setFormData] = useState();
  const [isLiked, setisLiked] = useState(false);
  const [fav, setFav] = useState();
  const [userGroup, setUserGroup] = useState();
  const [ownRestaurant, setOwnRestaurant] = useState();

  let { id } = useParams();
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    getRestaurant();
    getReviews();
    if (isAuth) {
      getUser();
    }
    // console.log(isAuth);

    return () => {};
  }, []);

  function stars(num) {
    if (num === 1) {
      return <StarRateIcon />;
    } else if (num === 2) {
      return (
        <>
          <StarRateIcon /> <StarRateIcon />
        </>
      );
    } else if (num === 3) {
      return (
        <>
          <StarRateIcon /> <StarRateIcon /> <StarRateIcon />
        </>
      );
    } else if (num === 4) {
      return (
        <>
          <StarRateIcon /> <StarRateIcon /> <StarRateIcon />
          <StarRateIcon />
        </>
      );
    } else if (num === 5) {
      return (
        <>
          <StarRateIcon /> <StarRateIcon /> <StarRateIcon />
          <StarRateIcon /> <StarRateIcon />
        </>
      );
    }
  }

  async function getRestaurant() {
    try {
      let resp = await axios.get(
        `http://localhost:8000/api/v1/restaurants/${id}`
      );
      let info = resp.data.restaurant;
      // console.log(resp);
      setSingle({ info });
      setisLoaded(true);
    } catch (err) {
      console.log(err.response);
    }
  }

  async function getReviews() {
    try {
      let resp = await axios.get(`http://localhost:8000/api/v1/reviews/${id}`);
      let rev = resp.data.reviews;
      setReviews(rev);
      // console.log(resp);
    } catch (err) {
      console.log(err.response);
    }
  }

  async function getUser() {
    try {
      let resp = await axios.get(
        `http://localhost:8000/api/v1/auth/get-user/${userId}`
      );
      let res = resp.data.profile.favourites;
      checkLiked(res);
      setFav(res);
      setUserGroup(resp.data.group.name);
      setOwnRestaurant(resp.data.profile.restaurant_owned[0]);
      // console.log(resp.data.profile.restaurant_owned[0]);
    } catch (err) {
      console.log(err.response);
    }
  }

  function checkLiked(arr) {
    for (let index = 0; index < arr.length; index++) {
      if (arr[index] == id) {
        setisLiked(true);
      }
    }
  }

  const url =
    "https://images.unsplash.com/photo-1546484613-910673d7d247?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

  const useStyles = makeStyles((theme) => ({
    header: {
      backgroundImage: `url(${url})`,
      height: "30vh",
      position: "center",
      backgroundSize: "cover",
    },
  }));

  const classes = useStyles();

  async function likeRestaurant() {
    if (!isLiked) {
      try {
        let token = localStorage.getItem("token");
        // console.log(token);
        let resp = await axios.post(
          `http://localhost:8000/api/v1/auth/favourite-restaurant/${userId}/${id}`,
          {},
          { headers: { Authorization: `Token ${token}` } }
        );
        // console.log(resp);
        setisLiked(true);
      } catch (err) {
        console.log(err.response);
        alert("Please login to like!");
      }
    } else {
      try {
        let token = localStorage.getItem("token");
        let resp = await axios.post(
          `http://localhost:8000/api/v1/auth/unfavourite-restaurant/${userId}/${id}`,
          {},
          { headers: { Authorization: `Token ${token}` } }
        );
        // console.log(resp);
        setisLiked(false);
      } catch (err) {
        console.log(err.response);
        alert("Please login to like!");
      }
    }
  }

  function renderPage() {
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
                {single.info.name}
              </Typography>
            </Grid>

            <Grid container justify="center">
              <Typography align="center" variant="button" color="textSecondary">
                {single.info.address.toUpperCase()}
              </Typography>
            </Grid>
            <Grid container justify="center" style={{ marginTop: "5px" }}>
              <Chip label={single.info.cuisine} style={{ padding: "10px" }} />
            </Grid>
            <Grid
              container
              justify="center"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
              <Button onClick={likeRestaurant}>
                <ThumbUpIcon
                  fontSize="large"
                  color={isLiked ? "primary" : "action"}
                />
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Container>
            <TabPanel
              reviews={reviews}
              id={id}
              stars={stars}
              userGroup={userGroup}
              getRestaurant={getRestaurant}
              getReviews={getReviews}
              isAuth={isAuth}
              ownRestaurant={ownRestaurant}
            />
          </Container>
        </Grid>
      </>
    );
  }

  return isLoaded ? (
    renderPage()
  ) : (
    <Backdrop open="true">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Restaurant;
