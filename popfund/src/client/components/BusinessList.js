import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FlatList from 'flatlist-react';
import './BusinessList.css'
import { borders } from '@material-ui/system';
import { Box } from '@material-ui/core';
import Text from 'react-text'
import Truncate from 'react-truncate'
import { green, grey } from '@material-ui/core/colors';


class BusinessList extends Component {
    
    renderBusiness = (business, idx) => {
        return (
            <Box className="listItem" border={0.5} borderRadius={12} borderColor="grey.300">
            <a style={{textDecoration: "none", color: "black"}} href={business.businessPageLink}>
                <div style={{ display: "flex"}}>
                    <div /* Business Image */ style={{width: '26%'}}> 
                        <img style={{width:150, height: 150, objectFit: "cover", borderRadius: 10}} 
                            src={business.coverImage} 
                        alt="Business picture"/>
                    </div>

                    <div style={{flexGrow: 1, marginRight: 50, width: 300}}>
                        <p className="businessName"> 
                            {business.name} 
                        </p>
                        <p style={{lineHeight: 0, fontSize: 15, marginBottom: 30}}>
                            <div style={{float: "left", marginRight: 30}}>
                                Rating
                            </div>
                            <div style={{flexGrow: 1, paddingLeft: 20, width: 100, marginLeft: 40, color: "grey"}}>
                                0.3 mi
                            </div>
                        </p>
                        <Truncate className="businessDescription" lines={2} ellipsis={<span>... <a style={{color: "darkorchid"}} href='/link/to/article'>more</a></span>}>
                            A description or example review should fill up the rest of this area.
                            I love this place, they sell amazing things here, it's like no other. 
                            The furniture they sell here is of the highest quality. M
                        </Truncate>
                    </div>

                    <div className="contactInfo">
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
                    list={exampleListData} 
                    renderItem={this.renderBusiness}
                />
            </div>
        );
    }
}





const listStyle = {
    listContainer: {
        flex: 1,
        width: 800,
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
  

export default BusinessList;import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

// Gonna need to fetch this kind of data from backend
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


class BusinessList extends Component {
    
    render() {
        return (
          <View>
            <nav style={{marginTop: 50, marginLeft: 30, display: "flex", top: 0}}> 
              <div /* this will be for our logo */ style={{width: '10%'}}>
                Logo
              </div>
              <div>
                <Text style={{borderWidth: 1, borderColor: "gray", padding: 5, width: '100%'}}>
                  Search bar goes up here
                </Text>
                
              </div>
            </nav>
    
            <FlatList style={listview.container}  // initiate UI list of local businesses
              data={exampleListData}  // list of businesses
              renderItem={ ({ item }) => <this.renderBusiness business={item} /> }  // render each business in list, call helper funciton renderBusiness
              keyExtractor={item => item.id}
            />
          </View>
        );
      }
    
      renderBusiness = ({ business }) => {
        return (
        <View style={listview.item}>
        <a style={{textDecoration: "none"}} href={business.businessPageLink}>
        <div style={{display: "flex"}}>
            <div /* Business Image */ style={{width: '26%'}}> 
              <img style={{width:150, height: 150, objectFit: "cover", borderRadius: 10}} src={business.coverImage} alt="Business picture"/>
            </div>
    
            <div /* Leftside Text */ style={{flexGrow: 1, marginRight: 50, marginTop: 4, width: 300}}>
              <Text /* Business Name */ style={listview.businessName}>
                {business.name} 
              </Text>
              <br></br>
              <Text /* Rating will go here */ >
                Rating   <Text style={{color: "grey"}}>0.3 mi</Text>
              </Text><br></br><br></br>
              <Text style={{color: "grey"}}>
                A description or example review should fill up the rest of this area.
                I love this place, they sell amazing things here, it's like no other. 
                The furniture they sell here is of the highest quality.
              </Text>
              <br></br>
            </div>
    
            <div /* Rightside Text */>
              <Text style={listview.addressPhoneCity}>
                Phone Number 
                <br></br>
                Address Line
                <br></br>
                City
              </Text>
            </div>
    
        </div>
        </a>
        </View>
        ) 
      } 
}

const listview = StyleSheet.create({
    container: {
     flex: 1,
     width: 800,
     marginTop: 50,
     marginLeft: 75,
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
      fontFamily: 'Rockwell',
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
  
  })

export default BusinessList;
