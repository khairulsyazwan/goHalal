import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {
  Card,
  CardContent,
  Container,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Link,
} from "@material-ui/core";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <Box>{children}</Box>
        </Container>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    margin: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SimpleTabs({ reviews, id, token, stars, userGroup }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [formData, setFormData] = useState();

  let userId = parseInt(localStorage.getItem("userId"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function onChange(e) {
    setFormData({
      ...formData,
      restaurant: parseInt(id),
      user: userId,
      [e.target.name]: e.target.value,
    });
  }

  function submit(e) {
    e.preventDefault();
    // console.log(formData);
    if (formData) {
      postReview();
    }
  }

  async function postReview() {
    try {
      let token = localStorage.getItem("token");
      let resp = await axios.post(
        `http://localhost:8000/api/v1/reviews/post/${userId}/${id}/`,
        formData,
        { headers: { Authorization: `Token ${token}` } }
      );
      console.log(resp);
      alert("Successfully added review!");
    } catch (err) {
      console.log(err.response);
      alert("Please login to submit a review");
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Reviews" {...a11yProps(0)} />
          {userGroup == "normal_user" ? (
            <Tab label="Leave A Review" {...a11yProps(1)} />
          ) : (
            <Tab label="Edit Page" {...a11yProps(1)} />
          )}
          {/* <Tab label="Leave A Review" {...a11yProps(1)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {reviews ? (
          <ul className="list-group mb-4">
            <Grid container justify="center">
              <Grid item xs={8}>
                {reviews.map((card, index) => (
                  <Grid item xs={12} key={index}>
                    <Card
                      className={classes.card}
                      style={{ marginTop: "10px" }}
                    >
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.review_title}
                        </Typography>
                        <Typography>{stars(card.average_rating)}</Typography>
                        <Typography>
                          {card.review_body} - {card.user.username}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </ul>
        ) : (
          <div>No reviews yet! </div>
        )}
      </TabPanel>

      <TabPanel value={value} index={1}>
        {userGroup == "normal_user" ? (
          <Container component="main" maxWidth="md">
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="review_title"
                      variant="outlined"
                      fullWidth
                      id="review_title"
                      label="Title"
                      autoFocus
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="review_body"
                      label="Share your thoughts!"
                      name="review_body"
                      autoComplete="lname"
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="service-rating-label">
                        Service Rating
                      </InputLabel>
                      <Select
                        labelId="service-rating-label"
                        id="service_rating"
                        name="service_rating"
                        fullWidth
                        defaultValue=""
                        onChange={onChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="taste-rating-label">
                        Taste Rating
                      </InputLabel>
                      <Select
                        labelId="tate-rating-label"
                        id="taste"
                        name="taste"
                        fullWidth
                        onChange={onChange}
                        defaultValue=""
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="cleanliness-rating-label">
                        Cleanliness Rating
                      </InputLabel>
                      <Select
                        labelId="cleanliness-rating-label"
                        id="service_rating"
                        name="cleanliness_rating"
                        fullWidth
                        onChange={onChange}
                        defaultValue=""
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submit}
                >
                  Submit
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Have an account?
                      <br />
                      Account required to post a review.
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        ) : (
          <Container component="main" maxWidth="md">
            <div className={classes.paper}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="review_title"
                      variant="outlined"
                      fullWidth
                      id="review_title"
                      label="Title"
                      autoFocus
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="review_body"
                      label="Share your thoughts!"
                      name="review_body"
                      autoComplete="lname"
                      onChange={onChange}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="service-rating-label">
                        Service Rating
                      </InputLabel>
                      <Select
                        labelId="service-rating-label"
                        id="service_rating"
                        name="service_rating"
                        fullWidth
                        defaultValue=""
                        onChange={onChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="taste-rating-label">
                        Taste Rating
                      </InputLabel>
                      <Select
                        labelId="tate-rating-label"
                        id="taste"
                        name="taste"
                        fullWidth
                        onChange={onChange}
                        defaultValue=""
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="cleanliness-rating-label">
                        Cleanliness Rating
                      </InputLabel>
                      <Select
                        labelId="cleanliness-rating-label"
                        id="service_rating"
                        name="cleanliness_rating"
                        fullWidth
                        onChange={onChange}
                        defaultValue=""
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={submit}
                >
                  Submit
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Have an account?
                      <br />
                      Account required to post a review.
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        )}
      </TabPanel>
    </div>
  );
}
