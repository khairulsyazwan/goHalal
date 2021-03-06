import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Grid, TextField, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Pages from "./Pages";
import Autocomplete from "@material-ui/lab/Autocomplete";
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

  const url =
    "https://images.unsplash.com/photo-1546484613-910673d7d247?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

  const useStyles = makeStyles((theme) => ({
    header: {
      backgroundImage: `url(${url})`,
      height: "20vh",
      position: "center",
      backgroundSize: "cover",
    },
    option: {
      fontSize: 15,
      "& > span": {
        marginRight: 10,
        fontSize: 18,
      },
    },
  }));

  const classes = useStyles();

  function submit(e, values) {
    let results = [];
    if (values != null) {
      for (let index = 0; index < locations.length; index++) {
        if (values.name == locations[index].name) {
          results.push(locations[index]);
        }
      }
      setLocations(results);
    } else {
      getRestaurants();
    }
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
          <Grid
            container
            style={{ marginTop: "10px", marginBottom: "10px" }}
            justify="center"
          >
            <Autocomplete
              id="restaurant select"
              style={{ width: 300 }}
              options={locations}
              classes={{
                option: classes.option,
              }}
              onChange={submit}
              autoHighlight
              getOptionLabel={(option) => option.name}
              renderOption={(option) => (
                <React.Fragment>{option.name}</React.Fragment>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Enter restaurant name"
                  variant="outlined"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "new-password",
                  }}
                />
              )}
            />
          </Grid>

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
