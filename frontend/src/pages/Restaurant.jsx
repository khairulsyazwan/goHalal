import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Backdrop,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

function Restaurant() {
  const [single, setSingle] = useState({});
  const [isLoaded, setisLoaded] = useState(false);
  const [reviews, setReviews] = useState();
  const [formData, setFormData] = useState();
  let { id } = useParams();
  let userId = localStorage.getItem("userId");

  useEffect(() => {
    getRestaurant();
    getReviews();
    return () => {};
  }, []);

  

  async function getRestaurant() {
    try {
      let resp = await axios.get(
        `http://localhost:8000/api/v1/restaurants/${id}`
      );
      let info = resp.data.restaurant;
      // console.log(rest);
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

  async function postReview() {
    try {
      let resp = await axios.post(
        `http://localhost:8000/api/v1/reviews/post/${userId}/${id}`,
        formData
      );
      // console.log(resp);
    } catch (err) {
      console.log(err.response);
    }
  }

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  function renderPage() {
    return (
      <Container>
        <Grid container>
          <Grid item>
            <Container>
              <h1>
                {single.info.name} <Chip label={single.info.cuisine} />
              </h1>

              <h4>{single.info.address}</h4>
              {/* <img src={single.info.picture} alt="" srcset="" /> */}
            </Container>
          </Grid>
          <Grid item></Grid>
        </Grid>
        <Divider />
        <Grid container>
          <Container>
            <h1>Reviews</h1>
          </Container>
        </Grid>
      </Container>
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
