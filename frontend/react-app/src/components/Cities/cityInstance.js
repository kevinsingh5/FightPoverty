import React, { Component } from 'react';
import $ from 'jquery';
import { TwitterShareButton, FacebookShareButton, TwitterIcon, FacebookIcon } from 'react-share';
import CountyCard from '../CountyModel/CountyCard.js';
import CharityCard from '../CharityModel/CharityCard.js';
import {getSpecificCharity} from '../../queries/charityQueries';
import {getSpecificCounty} from '../../queries/countyQueries';

var mapBounds = [0, 0, 0, 0];

class CityInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      charityInfo : [],
      countyInfo : []
    };
  }

  async componentWillMount () {
    // console.log(this.props.location.state.charities[0].name)
    const charity = await getSpecificCharity(this.props.location.state.charities[0].name);
    // console.log(charity)
    const county = await getSpecificCounty(this.props.location.state.county.name);
    //console.log(county);
    var this2 = this;
    // search for city coordinates
    $.getJSON('https://nominatim.openstreetmap.org/search?q=' + this.props.location.state.name + ',+' + this.props.location.state.state + '&format=json', function(data) {
      // do stuff with the data
      //console.log(data);
      if(data.length > 0) {
        var loc = data[0];
        //console.log(location);
        mapBounds = loc['boundingbox'];
        this2.setState({ charityInfo: charity, countyInfo: county});
      }
    });

    this.setState({ charityInfo: charity, countyInfo: county});
    
    //console.log(this.props.location.state.state);
  }
  //scroll to top after clicking on card
  componentDidMount() {
    window.scrollTo(0, 0);

    //console.log($);
  }




  render() {
    console.log(this.state.charityInfo)
    return (
      
<div>
              <section className="jumbotron text-center">
                  <div className="container">
                    <h1 className="jumbotron-heading">{this.props.location.state.name}</h1>
                    <p className="lead text-muted"></p>
                  </div>
              </section>

              <TwitterShareButton 
                className='float-right' 
                url={document.URL} 
                title={"Charites in " + this.props.location.state.name + ", " + this.props.location.state.state + ":\n"}> 
                <TwitterIcon size={48} round /> 
              </TwitterShareButton> 
              <FacebookShareButton 
                className='float-right' 
                url={document.URL}> 
                <FacebookIcon size={48} round /> 
              </FacebookShareButton> 

              <ul>
                <li>State: {this.props.location.state.state} </li>
                <li>Counties: {this.props.location.state.county.name}</li>

              </ul>
      <div align="center">
        <iframe width='600' height='450' src={"https://www.openstreetmap.org/export/embed.html?bbox=" + mapBounds[2] + "%2C" + mapBounds[0] + "%2C" + mapBounds[3] + "%2C" + mapBounds[1]} frameBorder="0" allowFullScreen></iframe>
        
        <br/>
        <small><a href={"https://www.openstreetmap.org/search?query=" + this.props.location.state.name + "%2C%20" + this.props.location.state.state + "#map=13"}>View Larger Map</a></small>
      </div>
        <h1 align="center"> Charities in {this.props.location.state.name}</h1>

      <div align="center">
        {this.state.charityInfo.map((dynamicCharity, i) => <CharityCard 
                  key = {i} charityInfo = {dynamicCharity}/>)}  
      </div>

        <h1 align="center"> Counties related to {this.props.location.state.name}</h1>
      <div align = "center">
        {this.state.countyInfo.splice(0,1).map((dynamicCounty, i) => <CountyCard 
                          key = {i} countyInfo = {dynamicCounty} />)}

          </div>

      
  </div>
          
                
      
  
    );

  }
}

export default CityInstance;   