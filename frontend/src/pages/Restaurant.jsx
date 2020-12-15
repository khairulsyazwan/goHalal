import React, { useEffect, useState } from "react";
import { NavLink, useParams, Redirect } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Button,
  Container,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
} from "@material-ui/core";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Chip from "@material-ui/core/Chip";

function Restaurant() {
  const [single, setSingle] = useState({});
  const [isLoaded, setisLoaded] = useState(false);
  let { id } = useParams();

  useEffect(() => {
    getRestaurant();
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
      console.log(single);
    } catch (err) {
      console.log(err.response);
    }
  }

  function renderPage() {
    return (
      <>
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
            <h1>
              Reviews <AddBoxIcon />
            </h1>
            <FormControl>
              <InputLabel>Add your review</InputLabel>
              <Input id="my-input" />
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </FormControl>
          </Container>
        </Grid>
      </>
    );
  }

  return isLoaded ? renderPage() : <CircularProgress />;
}

export default Restaurant;
