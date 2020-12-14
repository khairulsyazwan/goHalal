import React, { useEffect, useState } from "react";
import { NavLink, useParams, Redirect } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

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
        <h1>{single.info.name}</h1>
        <h2>{single.info.cuisine}</h2>
        <h1>{single.info.address}</h1>
        <img src={single.info.picture} alt="" srcset="" />
      </>
    );
  }

  return isLoaded ? renderPage() : <CircularProgress />;
}

export default Restaurant;
