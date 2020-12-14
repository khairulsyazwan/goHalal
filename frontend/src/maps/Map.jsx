import React, { useCallback, useState } from "react";
import { computeDistanceBetween } from "spherical-geometry-js";
import {
  GoogleMap,
  useLoadScript,
  Autocomplete,
  Marker,
} from "@react-google-maps/api";
// import mapStyle from "./MapStyle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { locations } from "./rest-arr";
import { Button } from "@material-ui/core";
import Container from "@material-ui/core/Container";

/* global google */

function Map() {
  const [libraries, setlibraries] = useState(["places"]);
  const [autocomplete, setautocomplete] = useState(null);
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState({
    lat: 1.3521,
    lng: 103.8198,
  });
  const [markers, setMarkers] = useState([]);
  const [restaurantId, setRestaurantId] = useState([]);
  const [currentRestaurants, setCurrentRestaurants] = useState([]);
  const [locationMarker, setLocationMarker] = useState([]);

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };

  const options = {
    // styles: mapStyle,
    disableDefaultUI: false,
  };

  const ACoptions = {
    types: ["geocode"],
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
        results.push(arr[i]);
        // push restaurant id as reference
        resId.push(i + 1);
        resultsMain.push({
          name: arr[i][0],
          distance: Math.floor(res),
          id: i + 1,
        });
      }
    }
    resultsMain.sort(compareValues("distance"));
    setRestaurantId([]);
    setCurrentRestaurants([]);
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
      console.log(originLocation);
      let res = calcDist(locations, originLocation);
      let results = res[0];
      let resId = res[1];
      let curRes = res[2];
      setRestaurantId(resId);
      setCurrentRestaurants(curRes);
      removeMarkers();
      setMarkers(results);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  function removeMarkers() {
    setMarkers([]);
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
          let resId = res[1];
          let curRes = res[2];
          setRestaurantId(resId);
          removeMarkers();
          setMarkers(results);
          setCurrentRestaurants(curRes);
          setLocationMarker(pos);
          //   console.log(results, resId);
        },
        () => {
          alert("Try again.");
        }
      );
    } else {
      // Browser doesn't support Geolocation
      alert("Try again.");
    }
  }

  const renderMap = () => {
    return (
      <>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={zoom}
          center={center}
          options={options}
        >
          <Button
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
              left: "60%",
              // top: "4%",
              marginLeft: "-15px",
            }}
          >
            Get my location
          </Button>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            options={ACoptions}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
              }}
            />
          </Autocomplete>

          {locationMarker && <Marker />}

          {markers.length != 0 &&
            markers.map((mark, index) => (
              <Marker
                id={`marker-${index + 1}`}
                key={index}
                onLoad={onLoadMarker}
                position={{
                  lat: mark[1],
                  lng: mark[2],
                }}
                title={mark[0]}
              />
            ))}
        </GoogleMap>
        <div>
          <Container>
            <ol>
              {currentRestaurants.length != 0 &&
                currentRestaurants.map((mark, index) => (
                  <li key={index} id={index + 1}>
                    <h2>{mark.name}</h2> <h3>{mark.distance}m away</h3>
                    <h3>{mark.id}</h3>
                  </li>
                ))}
            </ol>
          </Container>
        </div>
      </>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return isLoaded ? renderMap() : <CircularProgress />;
}

export default Map;
