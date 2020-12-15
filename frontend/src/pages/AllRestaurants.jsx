import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import { NavLink } from "react-router-dom";
import { Container } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Pages from "./Pages";

function AllRestaurants() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = locations.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = Math.ceil(locations.length / postsPerPage);

  // Change page
  function paginate(e) {
    setCurrentPage(parseInt(e.target.innerText));
    console.log(e.target);
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

  return (
    <>
      <Container>
        <Pages restaurants={currentPosts} loading={loading} />
        <Pagination
          count={pageNumbers}
          onChange={paginate}
          page={currentPage}
          siblingCount={1}
          boundaryCount={1}
          hideNextButton={true}
          hidePrevButton={true}
          color="primary"
        />
      </Container>
    </>
  );
}

export default AllRestaurants;
