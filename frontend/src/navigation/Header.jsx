import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Switch from '@material-ui/core/Switch';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { withRouter, useHistory } from "react-router-dom";
import { Typography } from "@material-ui/core";

const username = localStorage.getItem("username");
// console.log("username = ",username);
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

const Header = (props) => {
  const { history } = props;
  const classes = useStyles();
  // const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let historyRoute = useHistory();
  // console.log(isMobile);

  /* If User is login or not registered */
  // const handleChange = (event) => {
  //   setAuth(event.target.checked);
  // };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    historyRoute.push("/");
  }

  const token = localStorage.getItem("token");
  // console.log("token = ",token)

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: "#ced4da" }}>
        <Toolbar>
          {/* <Typography variant="h5" className={classes.title}>
            yeHalal
          </Typography> */}
          {/* {auth && ( */}
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                onClick={handleMenu}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
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
                <MenuItem onClick={() => handleMenuClick("/login")}>
                  Login
                </MenuItem>
                <MenuItem onClick={() => handleMenuClick("/register")}>
                  Register
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <div className={classes.headerOptions}>
                <Button
                  className={classes.button}
                  variant="text"
                  onClick={() => handleButtonClick("/")}
                >
                  Home
                </Button>
                <Button
                  className={classes.button}
                  variant="text"
                  onClick={() => handleButtonClick("/map")}
                >
                  Find Nearby
                </Button>

                <Button
                  className={classes.button}
                  variant="text"
                  onClick={() => handleButtonClick("/all-restaurants")}
                >
                  All Restaurants
                </Button>

                {/* <Button className={classes.button} variant="text" onClick={() => handleButtonClick('/login')}>Login</Button>
                <Button className={classes.button} variant="text" onClick={() => handleButtonClick('/register')}>Register</Button> */}
              </div>
              <div className={classes.headerOptions3}>
                <Typography variant="h4" color="textPrimary">
                  go.halal
                </Typography>
              </div>
              <div className={classes.headerOptions2}>
                {/* <Button className={classes.button} variant="text" onClick={() => handleButtonClick('/')}>Home</Button>
                <Button className={classes.button} variant="text" onClick={() => handleButtonClick('/map')}>Map</Button> */}
                {token != null ? (
                  <div>
                    <Button
                      className={classes.button}
                      variant="text"
                      onClick={logout}
                    >
                      Logout
                    </Button>
                    <Button
                      className={classes.button}
                      variant="text"
                      onClick={() => handleButtonClick(`/user/{int:id}`)}
                    >
                      Logged in as: {username}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button
                      className={classes.button}
                      variant="text"
                      onClick={() => handleButtonClick("/login")}
                    >
                      Login
                    </Button>
                    <Button
                      className={classes.button}
                      variant="text"
                      onClick={() => handleButtonClick("/register")}
                    >
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
    </div>
  );
};

export default withRouter(Header);

// /* <IconButton
//             edge="false"
//             className={classes.menuButton}
//             color="inherit"
//             aria-label="menu">
//         <Typography>Not Mobile</Typography>
//         </IconButton>  */
// /* <IconButton
//   aria-label="account of current user"
//   aria-controls="menu-appbar"
//   aria-haspopup="true"
//   onClick={handleMenu}
//   color="inherit"
// >
//   <AccountCircle />
// </IconButton> */

// /* <FormGroup>
//   <FormControlLabel
//     control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
//     label={auth ? 'Logout' : 'Login'}
//   />
// </FormGroup> */
