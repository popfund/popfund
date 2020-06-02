import React, { Component } from 'react';
import FlatList from 'flatlist-react';
import './BusinessList.css'
import { Box } from '@material-ui/core';
import Truncate from 'react-truncate'
import './BusinessPage.css'
import { withRouter } from 'react-router-dom';
//import queryString from 'query-string';

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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import PropTypes from 'prop-types';

var qs = require('qs');

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
/*
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
*/

const styles = theme => ({
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
});

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];


class BusinessPage extends Component {



  constructor(props) {
      super(props);
      this.state = {keywords:[], address:'', description: '', businessPageLink:'', coverImage:'', name:'', phoneNumber:'', items:[]};
      //console.log(this.props.match.params.id);
  }

  componentDidMount() { 
    let id = qs.parse(this.props.location.search, { ignoreQueryPrefix: true }).id;
    const that = this;
    fetch('/api/getBusinessPage'+'?id='+id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        that.setState({keywords: data.keywords, address: data.address, description: data.description, businessPageLink: data.businessPageLink, coverImage: data.coverImage, name: data.name, phoneNumber: data.phoneNumber, items: data.saleItems})
      });
  }
//i can probably make a function to handle each card and inside of the loop that renders cards can set a variable equal to the output
//of that handler function...for now what I have works, I want to wait and see what the array coming from the database will look like

  render() {
    const { classes } = this.props;
    console.log(this.state.items);
    const cards = this.state.items;
    var i = -1; 
    return (
      <React.Fragment>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                {this.state.name}
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {this.state.description}
              </Typography>
              <div /* Business Image */ className="imageBlock">
              <img className="centeredImage"
                            src={this.state.coverImage}
                        alt="Business picture"
                        />
                    </div>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant="contained" color="primary" href={this.state.businessPageLink}>
                      Our website
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="outlined" color="primary" href='/donatePage'>
                      Click here to donate
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <div className="removeGrayBox">
            <Container className={classes.cardGrid} maxWidth="md">
              {/* End hero unit */}
              <Grid container spacing={4}>
                {cards.map((card) => (
                  <Grid item key={card} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={cards[i + 1].image}
                        title="This image"
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {++i + 1}) {cards[i].name} 
                        </Typography>
                        <Typography>
                          {cards[i].description} <br></br> <br></br> Price: {cards[i].price}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary" href={this.state.businessPageLink}>
                          Go To {this.state.name}
                        </Button>
                        <Button size="small" color="primary" href={'/donatePage' + '?id=' + cards[i]._id}>
                          Buy Now
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </div>
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
}

BusinessPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(BusinessPage);
