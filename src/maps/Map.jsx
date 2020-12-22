import React, { useEffect, useState } from "react";
import { computeDistanceBetween } from "spherical-geometry-js";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
import mapStyle from "./MapStyle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Backdrop, Button, Link } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { NavLink } from "react-router-dom";

/* global google */

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f0efeb",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    height: "300px",
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

function Map() {
  const [libraries, setlibraries] = useState(["places"]);
  const [autocomplete, setautocomplete] = useState(null);
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState({
    lat: 1.3521,
    lng: 103.8198,
  });
  const [markers, setMarkers] = useState([]);
  const [currentRestaurants, setCurrentRestaurants] = useState([]);
  const [locationMarker, setLocationMarker] = useState();
  const [highlightedMarker, setHighlightedMarker] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    getRestaurants();
    return () => {
      removeMarkers();
    };
  }, []);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

  const classes = useStyles();
  async function getRestaurants() {
    try {
      // let resp = await axios.get("http://localhost:8000/api/v1/restaurants/");
      let resp = await axios.get("/api/v1/restaurants/");
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
      getLocation();
    } catch (err) {
      console.log(err.response);
    }
  }

  const containerStyle = {
    width: "600px",
    height: "100vh",
  };

  const options = {
    styles: mapStyle,
    disableDefaultUI: true,
  };

  const ACoptions = {
    componentRestrictions: { country: "sg" },
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyAq6O_zgG0YtvxPVaQHjd0oGswPB_Nh2Qk",
    libraries,
  });

  function onLoad(autocomplete) {
    // console.log("autocomplete: ", autocomplete);
    setautocomplete(autocomplete);
  }

  const onLoadMarker = (marker) => {
    // console.log("marker: ", marker);
  };

  function calcDist(arr, loc) {
    let results = [];
    let resId = [];
    let resultsMain = [];

    for (let i = 0; i < arr.length; i++) {
      let loc2 = new google.maps.LatLng(arr[i][1], arr[i][2]);
      let res = computeDistanceBetween(loc2, loc);
      //   1km radius
      if (res <= 1000) {
        // console.log(arr[i]);
        results.push(arr[i]);
        // push restaurant id as reference
        resId.push(i + 1);
        resultsMain.push({
          name: arr[i][0],
          distance: Math.floor(res),
          id: arr[i][3],
          address: arr[i][4],
          picture: arr[i][5],
        });
      }
    }
    resultsMain.sort(compareValues("distance"));
    // setCurrentRestaurants([]);
    return [results, resId, resultsMain];
  }

  function compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }

      const varA = a[key];
      const varB = b[key];

      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  // autocomplete enter
  function onPlaceChanged() {
    if (autocomplete !== null) {
      //   console.log(autocomplete.getPlace().geometry.location);
      let place = autocomplete.getPlace();

      if (!place.geometry) {
        window.alert("No address available for input: '" + place.name + "'");
        return;
      }
      // Recenter the map to the selected address
      let originLocation = place.geometry.location;
      setCenter(originLocation);
      setZoom(15);
      setLocationMarker(originLocation);
      // console.log(originLocation);
      let res = calcDist(locations, originLocation);
      let results = res[0];
      let curRes = res[2];

      removeMarkers();
      setMarkers(results);
      setCurrentRestaurants(curRes);
      console.log(curRes);
    } else {
      // console.log("Autocomplete is not loaded yet!");
    }
  }

  function removeMarkers() {
    setMarkers([]);
    setCurrentRestaurants([]);
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          setZoom(15);
          setLocationMarker(pos);
          removeMarkers();
          let originLocation = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          let res = calcDist(locations, originLocation);
          let results = res[0];
          let curRes = res[2];
          removeMarkers();
          setMarkers(results);
          setCurrentRestaurants(curRes);
          setLocationMarker(pos);
          // console.log(locationMarker);
        },
        () => {
          alert(
            "Whoops! Something went wrong. Enable your location or enter it."
          );
        }
      );
    } else {
      // Browser doesn't support Geolocation
      alert("Whoops! Something went wrong. Enable your location or enter it.");
    }
  }

  function hello(id) {
    setHighlightedMarker("");
    setHighlightedMarker(`mark-${id}`);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = currentRestaurants.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const pageNumbers = Math.ceil(currentRestaurants.length / postsPerPage);

  // Change page
  function paginate(e) {
    setCurrentPage(parseInt(e.target.innerText));
  }

  const renderMap = () => {
    return (
      <Container className={classes.root}>
        <Grid container style={{ margin: "20px" }}>
          <Grid item md={6}>
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={zoom}
              center={center}
              options={options}
            >
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                options={ACoptions}
              >
                <input
                  type="text"
                  placeholder="Enter your location here.."
                  style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `250px`,
                    height: `40px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `20px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px",
                    marginTop: "10px",
                  }}
                />
              </Autocomplete>

              {/* <Button
                onClick={getLocation}
                variant="contained"
                color="primary"
                style={{
                  padding: `4px 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  top: "10%",
                  // marginLeft: "-15px",
                }}
              >
                Get my location
              </Button> */}

              {locationMarker && (
                <Marker
                  position={locationMarker}
                  icon="http://maps.google.com/mapfiles/kml/paddle/wht-stars.png"
                />
              )}

              {markers.length != 0 &&
                markers.map((mark, index) => (
                  <Marker
                    id={`mark-${mark[3]}`}
                    key={`mark-${index}`}
                    onLoad={onLoadMarker}
                    position={{
                      lat: mark[1],
                      lng: mark[2],
                    }}
                    title={mark[0]}
                    animation={
                      highlightedMarker === `mark-${mark[3]}`
                        ? google.maps.Animation.BOUNCE
                        : ""
                    }
                  />
                ))}
            </GoogleMap>
          </Grid>

          {currentPosts.length === 0 ? (
            <Backdrop open="true">
              <CircularProgress />
            </Backdrop>
          ) : (
            <Grid item md={6}>
              <Container className={classes.cardGrid} maxWidth="md">
                <Pagination
                  count={pageNumbers}
                  onChange={paginate}
                  page={currentPage}
                  siblingCount={1}
                  boundaryCount={1}
                  hideNextButton={true}
                  hidePrevButton={true}
                  color="primary"
                  style={{ margin: "20px" }}
                />
                <Grid container spacing={4}>
                  {currentPosts.map((card, index) => (
                    <Grid
                      item
                      key={index}
                      xs={12}
                      sm={12}
                      md={12}
                      onMouseOver={() => hello(card.id)}
                    >
                      <Card className={classes.card}>
                        {/* <CardMedia
                        className={classes.cardMedia}
                        image="https://source.unsplash.com/user/mockupgraphics"
                        title="restaurant"
                      />
                      <img src={card.picture} alt="recipe thumbnail" /> */}
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            <NavLink
                              to={`/restaurant/${card.id + 1}`}
                              style={{ textDecoration: "none" }}
                            >
                              {card.name}
                            </NavLink>
                          </Typography>
                          <Typography>{card.address}</Typography>
                          <Typography variant="button">
                            {card.distance}m away
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </Grid>
          )}
        </Grid>
      </Container>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? (
    renderMap()
  ) : (
    <Backdrop open="true">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Map;
