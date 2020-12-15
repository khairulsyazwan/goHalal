import React, { useEffect, useState } from "react";
import axios from "axios";

function AllRestaurants() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getRestaurants();
    return () => {};
  }, []);

  async function getRestaurants() {
    try {
      let resp = await axios.get("http://localhost:8000/api/v1/restaurants/");
      let rest = resp.data.restaurants;
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
    } catch (err) {
      console.log(err.response);
    }
  }
  return <div>All restaurants</div>;
}

export default AllRestaurants;
