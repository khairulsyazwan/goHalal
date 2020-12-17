import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { NavLink, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import SearchIcon from "@material-ui/icons/Search";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import CreateIcon from "@material-ui/icons/Create";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("xs")]: {
      flexGrow: 1,
    },
  },
  headerOptions: {
    display: "flex",
    flex: 1,
    // justifyContent: 'flex-start',
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignContent: 'flex-start',
    // justifyContent: 'space-evenly'
  },
  // headerMid: {
  //   display: 'flex',
  //   flex: 1,
  //   justifyContent: 'center'
  // },
  headerOptions2: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-end",
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignContent: 'flex-start',
    // justifyContent: 'space-evenly'
  },
  headerOptions3: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    // flexDirection: 'row',
    // justifyContent: 'flex-start',
    // alignContent: 'flex-start',
    // justifyContent: 'space-evenly'
  },
  button: {
    margin: "10px",
    // display: 'flex',
    // flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'flex-end',
  },
}));

function Header({
  isAuth,
  setIsAuth,
  isAdmin,
  setIsAdmin,
  isOwner,
  setIsOwner,
  login,
  logout,
  setLogin,
  setLogout,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  let historyRoute = useHistory();
  let userId;

  const [username, setUsername] = useState();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    historyRoute.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    historyRoute.push(pageURL);
  };

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUsername("");
    setIsAuth(false);
    setIsAdmin(false);
    setLogout(true);
    historyRoute.push("/");
  }

  const token = localStorage.getItem("token");

  if (isAuth) {
    getUser();
  }

  async function getUser() {
    userId = localStorage.getItem("userId");
    if (userId != null) {
      try {
        let resp = await axios.get(
          `http://localhost:8000/api/v1/auth/get-user/${userId}`
        );
        setUsername(localStorage.getItem("username"));
        // console.log(resp.data);
      } catch (err) {
        console.log(err.response);
      }
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#4db6ac" }}>
        <Toolbar>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                onClick={handleMenu}
                // color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h4" color="textPrimary">
                goHalal
              </Typography>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleMenuClick("/")}>Home</MenuItem>
                {isAuth ? (
                  <>
                    <MenuItem onClick={logOut}>Logout</MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem onClick={() => handleMenuClick("/signin")}>
                      Login
                    </MenuItem>
                    <MenuItem onClick={() => handleMenuClick("/signup")}>
                      Register
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <>
              <Typography
                variant="h5"
                color="textPrimary"
                style={{ marginRight: "10px" }}
              >
                <NavLink
                  to="/"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  goHalal
                </NavLink>
              </Typography>

              <div className={classes.headerOptions}>
                <Button
                  className={classes.button}
                  variant="text"
                  onClick={() => handleButtonClick("/map")}
                >
                  Find Nearby
                  <LocationOnIcon />
                </Button>

                <Button
                  className={classes.button}
                  variant="text"
                  onClick={() => handleButtonClick("/all-restaurants")}
                >
                  Restaurants
                  <SearchIcon />
                </Button>

                {/* <Button className={classes.button} variant="text" onClick={() => handleButtonClick('/login')}>Login</Button>
                <Button className={classes.button} variant="text" onClick={() => handleButtonClick('/register')}>Register</Button> */}
              </div>
              <div className={classes.headerOptions3}></div>
              <div className={classes.headerOptions2}>
                {/* <Button className={classes.button} variant="text" onClick={() => handleButtonClick('/')}>Home</Button>
                <Button className={classes.button} variant="text" onClick={() => handleButtonClick('/map')}>Map</Button> */}
                {token != null ? (
                  <div>
                    <Button
                      className={classes.button}
                      variant="text"
                      onClick={logOut}
                    >
                      <LockOpenIcon />
                      Logout
                    </Button>

                    {isAdmin ? (
                      <Button
                        className={classes.button}
                        variant="text"
                        onClick={() => handleButtonClick(`/admin`)}
                      >
                        <AccountCircleIcon />
                        Admin
                      </Button>
                    ) : (
                      <Button
                        className={classes.button}
                        variant="text"
                        onClick={() => handleButtonClick(`/user/${userId}`)}
                      >
                        <AccountCircleIcon /> {username}
                      </Button>
                    )}
                  </div>
                ) : (
                  <div>
                    <Button
                      className={classes.button}
                      variant="text"
                      onClick={() => handleButtonClick("/signin")}
                    >
                      <LockOpenIcon />
                      Login
                    </Button>
                    <Button
                      className={classes.button}
                      variant="text"
                      onClick={() => handleButtonClick("/signup")}
                    >
                      <CreateIcon />
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
          {/* )} */}
        </Toolbar>
      </AppBar>
      {login && (
        <Collapse in={login}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setLogin(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Successfully logged in!
          </Alert>
        </Collapse>
      )}
      {logout && (
        <Collapse in={logout}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setLogout(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            severity="info"
          >
            You are logged out! See you soon!
          </Alert>
        </Collapse>
      )}
    </div>
  );
}

export default Header;
