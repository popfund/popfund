import React, { Component } from 'react';
import FlatList from 'flatlist-react';
import './BusinessList.css'
import { Box } from '@material-ui/core';
import Truncate from 'react-truncate'


class BusinessList extends Component {

    constructor(props) {
        super(props);
        this.state = {listData:[]};
    }

    componentDidMount() {
        const that = this;
        fetch('/api/getBusinesses')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                that.setState({listData: data});
            });
    }

    renderBusiness = (business, idx) => {
        return (
            <Box className="listItem" border={0.5} borderRadius={12} borderColor="grey.300">
            <a style={{textDecoration: "none", color: "black"}} href={business.businessPageLink}>
                <div style={{ display: "flex"}}>
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
                    
                        <Truncate className="businessDescription" lines={2} ellipsis={<span>... <a style={{color: "darkorchid"}} href='/link/to/article'>more</a></span>}>
                            A description or example review should fill up the rest of this area.
                            I love this place, they sell amazing things here, it's like no other. 
                            The furniture they sell here is of the highest quality.
                        </Truncate>
                    </div>

                    <div style={{flexGrow: 1}} className="contactInfo">
                        <p>Phone Number</p>
                        <p>Address Line</p>
                        <p>City</p>
                    </div>

                </div>
            </a>
            </Box>
        );
      }

    render() {
        return (
            <div style={listStyle.listContainer}>
                <FlatList 
                    list={this.state.listData} 
                    renderItem={this.renderBusiness}
                />
            </div>
        );
    }
}





const listStyle = {
    listContainer: {
        flex: 1,
        width: "45%",
        marginTop: 50,
        marginLeft: 50,
        marginBottom: 100,
    },
    item: {
        margin: 10,
        padding: 20,
        fontSize: 18,
        borderWidth: 1.5,
        borderRadius: 7.5,
        borderColor: '#FBE9F4',
    },
    businessName: {
        fontFamily: "Open Sans",
        fontSize: 27
    },
    businessImg: {
        height: 50,
        width: 50
      },
    addressPhoneCity: {
    color: 'black',
    fontSize: 14,
    textAlign: "left"
    },

}

const exampleListData = [
    {
      id: '0',
      name: 'Chipotle',
      coverImage: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      businessPageLink: "https://www.my.ucla.edu"
    },
    {
      id: '1',
      name: 'Subway',
      coverImage: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      businessPageLink: "https://www.my.ucla.edu"
    },
    {
      id: '2',
      name: 'Antique Store',
      coverImage: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      businessPageLink: "https://www.my.ucla.edu"
    },
    {
      id: '3',
      name: 'Jack In The Box',
      coverImage: "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
      businessPageLink: "https://www.my.ucla.edu"
    }
  ];


export default BusinessList;
