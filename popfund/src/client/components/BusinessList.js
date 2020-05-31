import React, { Component, useState } from 'react';
import FlatList from 'flatlist-react';
import './BusinessList.css'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import TextField from '@material-ui/core/TextField';
import logo from './purple-42887_1280.png';
import purpMark from './purpMark.png'
import mapStyles from './mapStyles'


const libraries = ["places"];
const mapContainerStyle = {
    height: "75vh",
    width: "46vw",
};
const mapOptions = {
    styles: mapStyles,
}
const haversine = require('haversine');
const bizAndDis = [];
var gLat = null
var gLong = null


function Map1(props) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyCB3kuQ8YdaOzKzRF58--PKV32EJZvHWfI",
        libraries,
      });

    const [selected, setSelected] = React.useState(null);

    console.log(window.lat1);
    console.log(window.long1);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    let businessesMap = props.list;
    let businessCoords = [];



    for (var [index, value] of businessesMap.entries()) {
        businessCoords.push([value.lat, value.long, value.name, value.coverImage])
    }

    return (
        <div>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={14}
                center={{
                    lat: window.lat1,
                    lng: window.long1,
                  }}
                options={mapOptions}
            >
                 {businessCoords.map((value, index) => {
                    return <Marker
                        position={{ lat: parseFloat(value[0]), lng: parseFloat(value[1]) }}
                        name={"hello"}
                        onMouseOver={() => { setSelected(value); }}
                        icon={{
                            url: purpMark,
                            scaledSize: new window.google.maps.Size(45,43)
                        }}
                        onMouseLeave={() => { setSelected(null); }}
                        >

                    </Marker>
                })}



                <Marker
                    position={{
                        lat: window.lat1,
                        lng: window.long1,
                      }}>
                </Marker>


                {selected ? (
                    <InfoWindow
                        position={{ lat: parseFloat(selected[0]) + 0.0001, lng: parseFloat(selected[1]) }}
                        onCloseClick={() => { setSelected(null); }}
                    >
                        <div className="mapBusinessName">
                            <img className="mapImage" src={selected[3]} />
                            {selected[2]}
                        </div>
                    </InfoWindow>)
                : null}

            </GoogleMap>
        </div>
    )
}






class BusinessList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listData:[],
            sortedDistanceList:[],
            street: "Emacs Way",
            city: "Eggville",
            curLat: null,
            curLng: null,
            dis: null
        };

        
        
    }

    // Fetch buisinesses 
    componentDidMount() {
        const that = this;
        console.log('component mounted');
        console.log(window.userID);
        console.log(window.userFname);
        console.log(window.userLname);
        console.log(window.userEmail);
        // need to add curlat and curlong here
        fetch('/api/getBusinesses'+"?lat=37&long=-122&distance=20000")
            .then(res => res.json())
            .then(data => {
                that.setState({listData: data});
            });
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                //console.log("Latitude is :", position.coords.latitude);
                //console.log("Longitude is :", position.coords.longitude);
                gLat = position.coords.latitude
                gLong = position.coords.longitude
            });
        }
    }

    // Parse buiseness address
    parseAdd(biz) {
        var full = biz.address.split(",");
        if(full.length > 1) {
            this.state.street = full[0];
            this.state.city = full[1];
        }
    }

    // Sort businesses based on location/distance
    sortBusinesses() {
        //console.log(gLat)
        //console.log(gLong)

        // Calculate distance for each business, make tuple of new copied arr and distance
        for (var [index, value] of this.state.listData.entries()) {
            // Calculate euclidean distance
            var start = {
                latitude: gLat,
                longitude: gLong
            }
            var end = {
                latitude: parseFloat(value.lat),
                longitude: parseFloat(value.long)
            }
            var dis = haversine(start, end, {unit: 'mile'});
            bizAndDis.push([value, dis]);
        }

        // Sort tuple/arr based on distance
        var len = bizAndDis.length;
        for(var i = len-1; i>=0; i--) {
            for(var j = 1; j<=i; j++) {
                if(bizAndDis[j-1][1]>bizAndDis[j][1]) {
                    var temp = this.state.listData[j-1];
                    this.state.listData[j-1] = this.state.listData[j];
                    this.state.listData[j] = temp;
                    var temp2 = bizAndDis[j-1];
                    bizAndDis[j-1] = bizAndDis[j];
                    bizAndDis[j] = temp2;
                 }
              }
        }
    }


    renderBusiness = (business, idx) => {
        return (
            <div className="listItem">
            <a style={{textDecoration: "none", color: "black"}} href={'/businessPage?id=' + business._id}>
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
                                {bizAndDis[idx][1].toFixed(1)} mi
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
                                <TextField
                                    size={"small"}
                                    fullWidth id="outlined-search"
                                    style={{border: 'none'}}
                                    variant="outlined"
                                    color='black'
                                    placeholder="Find sushi, barber, fat sal's... "
                                    type="search"
                            
                                    onKeyPress={(ev) => {
                                        console.log(`Pressed keyCode ${ev.key}`);
                                        if (ev.key === 'Enter') {
                                          // Do code here
                                          ev.preventDefault();
                                        }
                                      }}
                                />
                        </div>
                    </div>
                    <div className="options">
                        <div style={{float: "left"}}>
                           <a className="optLink" href="">Add a Business</a>
                        </div>
                        <div style={{float: "right"}}>
                            <a className="optLink" href={'/donatePage'}>Donate!</a>
                        </div>
                    </div>
                </div>
                
                <div className="contentBlock">
                    <div className="list">
                        {this.sortBusinesses()}
                        <FlatList
                            list={this.state.listData}
                            renderItem={this.renderBusiness}
                        />
                    <div class="grad">
                    </div>
                    </div>
                    <div className="map">
                        <Map1 list={this.state.listData} />
                    </div>
                </div>
            </div>
        );
    }
}


export default BusinessList;

