import React, { Component } from 'react';
import FlatList from 'flatlist-react';
import './BusinessList.css'
import { Box } from '@material-ui/core';
import Truncate from 'react-truncate'
import './BusinessPage.css'
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const url = window.location.href;
const id = url.substring(38);
console.log("I got the ID:");
console.log(id);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/popfund/popfund">
        popfund
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Album() {
  const classes = useStyles();
  console.log('m');

  //maybe reput this in later:

  // <AppBar position="relative">
  //   <Toolbar>
  //     <CameraIcon className={classes.icon} />
  //     <Typography variant="h6" color="inherit" noWrap>
  //       Album layout
  //     </Typography>
  //   </Toolbar>
  // </AppBar>
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              CHIPOTLE
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              We are a restaurant.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Click here for something
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Click here for something else
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="data:image/jpeg;base64,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"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Chipotle
                    </Typography>
                    <Typography>
                      This is Dave.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Click here
                    </Button>
                    <Button size="small" color="primary">
                      Click here
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          popfund
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          A platform dedicated to helping mom and pop shops.
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}



class BusinessList extends Component {


  constructor(props) {
      super(props);
      this.state = {businessData:[]};
  }


  render() {
  return (
    <div>
        <Album />
    </div>
  );
}
}




export default BusinessList;
