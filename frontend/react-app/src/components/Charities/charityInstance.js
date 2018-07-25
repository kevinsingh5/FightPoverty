import React, { Component } from 'react';
import $ from 'jquery';
import { TwitterShareButton, FacebookShareButton, TwitterIcon, FacebookIcon } from 'react-share'; 
import CityCard from '../CityModel/CityCard.js';
import CountyCard from '../CountyModel/CountyCard.js';
import {getSpecificCounty} from '../../queries/countyQueries';
import {getSpecificCity} from '../../queries/cityQueries';

var mapBounds = [0, 0, 0, 0];

class CharityInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      cityInfo: [],
      countyInfo: []
    };
  }

  async componentWillMount () {
    const city = await getSpecificCity(this.props.location.state.city.name);
    const county = await getSpecificCounty(this.props.location.state.county.name);

    var this2 = this;
    // search for city coordinates
    $.getJSON('https://nominatim.openstreetmap.org/search?q=' + this.props.location.state.address + ',+' + this.props.location.state.city.name + ',+' + this.props.location.state.city.state + '&format=json', function(data) {
      // do stuff with the data
      console.log(data);
      if(data.length > 0) {
        var loc = data[0];
        //console.log(location);
        mapBounds = loc['boundingbox'];
        console.log(data);
        this2.setState({ cityInfo: city, countyInfo: county});
      }
    });

    this.setState({ cityInfo: city, countyInfo: county });
  }
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

    return (
          <div>
                  <section className="jumbotron text-center">
                  <div className="container">
                    <h1 className="jumbotron-heading">{this.props.location.state.name}</h1>
                    <p className="lead text-muted">{this.props.location.state.mission_statement}</p>
                  </div>
              </section>

              <TwitterShareButton
                className='float-right'
                url={document.URL}
                title={this.props.location.state.name + " has a FightPoverty score of " + this.props.location.state.fight_poverty_score + ":\n"}>
                <TwitterIcon size={48} round />
              </TwitterShareButton>
              <FacebookShareButton
                className='float-right'
                url={document.URL}>
                <FacebookIcon size={48} round />
              </FacebookShareButton>

              <ul> 
                <li>Cause: {this.props.location.state.cause}</li>
                <li>Address: {this.props.location.state.address}</li>
                <li>City: {this.props.location.state.city.name}</li>
                <li>County: {this.props.location.state.county.name}</li>
                <li>State: {this.props.location.state.city.state}</li>
                <li>Zip Code:  {this.props.location.state.zip_code}</li>
                <li><a href= 'https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1093'>CharityNavigator's Accountability Score</a>: {this.props.location.state.charity_navigator_accountability_score} </li>
                <li><a href= 'https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=35'>CharityNavigator's Financial Score</a>: {this.props.location.state.charity_navigator_financial_score}</li>
                <li>CharityNavigator Rating: {this.props.location.state.charity_navigator_score}</li>
                <li>FightPoverty Rating: {this.props.location.state.fight_poverty_score}</li>
              </ul>
              <div align="center">
                <iframe width='600' height='450' src={"https://www.openstreetmap.org/export/embed.html?bbox=" + mapBounds[2] + "%2C" + mapBounds[0] + "%2C" + mapBounds[3] + "%2C" + mapBounds[1]} frameBorder="0" allowFullScreen></iframe>
                <br/>
                <small><a href={"https://www.openstreetmap.org/search?query=" + this.props.location.state.address + "%2C%20" + this.props.location.state.city.name + "%2C%20" + this.props.location.state.city.state + "#map=13"}>View Larger Map</a></small>
              </div>

              <h1 align="center"> Cities related to {this.props.location.state.name}</h1>
            <div align="center">
                 {this.state.cityInfo.splice(0,1).map((dynamicCity, i) => <CityCard 
                  key = {i} cityInfo = {dynamicCity}/>)}

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

export default CharityInstance;      