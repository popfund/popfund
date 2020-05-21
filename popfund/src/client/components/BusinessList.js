import React, { Component } from 'react';
import FlatList from 'flatlist-react';
import './BusinessList.css'
import { Box } from '@material-ui/core';
import Truncate from 'react-truncate'
import { GoogleMap, useLoadScript, Marker, InfoWindow, MarkerClusterer } from "@react-google-maps/api";
import TextField from '@material-ui/core/TextField';
import { shadows } from '@material-ui/system';
import logo from './purple-42887_1280.png';
import mapStyles from './mapStyles'
import BusinessPage from './BusinessPage.js'


const libraries = ["places"];
const mapContainerStyle = {
    height: "75vh",
    width: "46vw",
};
const mapOptions = {
    styles: mapStyles,
}
const center = {
    lat: 34,
    lng: -118,
  };

var businessCoords = [];

function addMarkers(list) {
    for (let index = 0; index < list.length; index++) {
        <Marker
            position={{ lat: list[i].lat, lng: list[i].long }}
            name={"hello"}
        />
    }

}

function Map1(list) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCB3kuQ8YdaOzKzRF58--PKV32EJZvHWfI",
        libraries,
      });
    
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    
    return (
        <div>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={center}
                options={mapOptions}
            >


            </GoogleMap>
        </div>
    )
}

class BusinessList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listData:[],
            street: "yessir",
            city: "West"
        };
    }

    componentDidMount() {
        const that = this;
        fetch('/api/getBusinesses'+"?lat=37&long=-122&distance=20000")
            .then(res => res.json())
            .then(data => {
                console.log(data);
                that.setState({listData: data});
            });
    }

    addBizCoord(biz) {
        var latTEMP = biz.lat;
        var longTEMP = biz.long;
        var coord = [latTEMP, longTEMP];
        businessCoords.push(coord);
    }
    
    parseAdd(biz) {
        var full = biz.address.split(",");
        if(full.length > 1) {
            this.state.street = full[0];
            this.state.city = full[1];
        }
    }

    renderBusiness = (business, idx) => {
        return (
            <div className="listItem">
                {this.addBizCoord(business)}
            <a style={{textDecoration: "none", color: "black"}} href={business.businessPageLink}>
                <div style={{ display: "flex"}} className="listitem">
                    <div /* Business Image */ className="imageBlock"> 
                        <img className="squareImg"
                            src={business.coverImage} 
                        alt="Business picture"/>
                    </div>

                    <div className="metaBlock">
                        <p className="businessName"> 
                            {business.name} 
                        </p>
                        <p>
                            <div className="businessRating">
                                Rating
                            </div>
                            <div className="businessDis">
                                0.3 mi
                            </div>
                        </p>
                            <p className="businessDescription">
                                {business.description}
                            </p>
                    </div>

                    <div className="contactInfo" style={{flexGrow: 1}}>
                        <p>{business.phoneNumber}</p>
                        <p>
                            {this.parseAdd(business)}
                            {this.state.street}
                        </p>
                        <p>{this.state.city}</p>
                    </div>

                </div>
            </a>
            </div>
        );
      }

    render() {
        return (
            <div className="all">
                <div className="upper">
                    <div>
                        <img className="heart" src={logo} />
                    </div>
                    <div className="positionSearch">
                        <div className="searchBar">
                            <Box boxShadow={5} borderRadius={4} sizeHeight={5}>
                                <TextField size={"large"} fullWidth id="outlined-search" placeholder="Find sushi, barber, fat sal's... " type="search" variant="outlined" />
                            </Box>
                        </div>
                    </div>
                    <p className="options">
                        <div style={{float: "left"}}>
                           <a class="optLink" href="">Add a Business</a>
                        </div>
                        <div style={{float: "right"}}>
                            <a class="optLink" href="">Donate!</a>
                        </div>
                    </p>
                </div>

                <div className="contentBlock">
       
                    <div className="list">
                        <FlatList 
                            list={this.state.listData} 
                            renderItem={this.renderBusiness}
                        />
                    <div class="grad">
                    </div>
                     
                    </div>
                    <div className="map">
                        <Map1 />
                    </div>
                </div>
            </div>
        );
    }
}


export default BusinessList;
