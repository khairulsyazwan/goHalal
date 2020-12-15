import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink } from "react-router-dom";
import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Pages from "./Pages";
import { makeStyles } from "@material-ui/core/styles";

function AllRestaurants() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = locations.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = Math.ceil(locations.length / postsPerPage);

  function paginate(e) {
    setCurrentPage(parseInt(e.target.innerText));
  }

  useEffect(() => {
    getRestaurants();
    return () => {};
  }, []);

  function clearRestaurants() {
    setLocations([]);
  }

  async function getRestaurants() {
    try {
      let resp = await axios.get("http://localhost:8000/api/v1/restaurants/");
      let rest = resp.data.restaurants;
      setLocations(rest);
      setLoading(true);
    } catch (err) {
      console.log(err.response);
    }
  }

  function renderLocations() {
    return (
      <ol>
        {locations.map((rest, index) => (
          <li key={index}>
            {rest.name} <br /> {rest.address} <br />{" "}
            <NavLink to={`/restaurant/${rest.id}`}>View</NavLink>
          </li>
        ))}
      </ol>
    );
  }

  const url =
    "https://images.unsplash.com/photo-1546484613-910673d7d247?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

  const useStyles = makeStyles((theme) => ({
    header: {
      backgroundImage: `url(${url})`,
      height: "20vh",
      position: "center",
      backgroundSize: "cover",
    },
  }));

  const classes = useStyles();

  function submit() {
    alert("test");
  }

  return (
    <>
      <Grid
        container
        className={classes.header}
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Typography align="center" variant="h2" color="textSecondary">
            Restaurants
          </Typography>
          <Typography variant="button" color="textSecondary">
            View all halal certified restaurants in Singapore.
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="center" justify="center">
        <Grid item>
          {/* <FormControl >
            <InputLabel htmlFor="my-input">Restaurant Name</InputLabel>
            <Input id="my-input" aria-describedby="my-helper-text" />
            <FormHelperText id="my-helper-text">
              We'll never share your email.
            </FormHelperText>
          </FormControl> */}

          <Pagination
            count={pageNumbers}
            onChange={paginate}
            page={currentPage}
            siblingCount={1}
            boundaryCount={1}
            hideNextButton={true}
            hidePrevButton={true}
            color="primary"
            style={{ marginTop: "10px" }}
          />
        </Grid>
      </Grid>

      <Grid container alignItems="center" justify="center">
        <Container>
          <Pages restaurants={currentPosts} loading={loading} />
        </Container>
      </Grid>
    </>
  );
}

export default AllRestaurants;
