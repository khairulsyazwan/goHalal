import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink } from "react-router-dom";

function AllRestaurants() {
  const [locations, setLocations] = useState([]);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    getRestaurants();
    return () => {
      clearRestaurants();
    };
  }, []);

  function clearRestaurants() {
    setLocations([]);
  }

  async function getRestaurants() {
    try {
      let resp = await axios.get("http://localhost:8000/api/v1/restaurants/");
      let rest = resp.data.restaurants;
      console.log(rest);
      let arr = locations;
      for (let index = 0; index < rest.length; index++) {
        let holding = [];
        holding.push(rest[index].name);
        holding.push(rest[index].lat);
        holding.push(rest[index].lng);
        holding.push(rest[index].id);
        holding.push(rest[index].address);
        holding.push(rest[index].picture);
        arr.push(holding);
      }
      setLocations(arr);
      setisLoaded(true);
    } catch (err) {
      console.log(err.response);
    }
  }

  function renderLocations() {
    return (
      <ol>
        {locations.map((rest, index) => (
          <li key={index}>
            {rest[0]} <br /> {rest[4]} <br />{" "}
            <NavLink to={`/restaurant/${rest[3]}`}>View</NavLink>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <>
      <div>
        All restaurants <br /> Showing{" "}
        {locations ? locations.length : <CircularProgress />} results.
      </div>
      <div>{isLoaded && renderLocations()}</div>
    </>
  );
}

export default AllRestaurants;
