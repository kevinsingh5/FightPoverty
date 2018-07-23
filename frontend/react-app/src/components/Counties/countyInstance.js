import React, { Component } from 'react';
import $ from 'jquery';
import { TwitterShareButton, FacebookShareButton, TwitterIcon, FacebookIcon } from 'react-share';
import CityCard from '../CityModel/CityCard.js';
import CharityCard from '../CharityModel/CharityCard.js';
import {getSpecificCharity} from '../../queries/charityQueries';
import {getSpecificCity} from '../../queries/cityQueries';

var mapBounds = [0, 0, 0, 0];


class CountyInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      charityInfo: [],
      cityInfo: []
    };
  }



  async componentWillMount () {
    const charity = await getSpecificCharity(this.props.location.state.charities[0].name)
    const city = await getSpecificCity(this.props.location.state.cities[0].name);

    console.log(this.props.location.state.name);
    var this2 = this;
    // search for city coordinates
    $.getJSON('https://nominatim.openstreetmap.org/search?q=' + this.props.location.state.name + ',+' + this.props.location.state.state + '&format=json', function(data) {
      // do stuff with the data
      console.log(data);
      if(data.length > 0) {
        var loc = data[0];
        //console.log(location);
        mapBounds = loc['boundingbox'];
        this2.setState({ charityInfo: charity, cityInfo: city});
      }
    });

    //this.setState({ charityInfo: charity, cityInfo: city});
  }

  //scroll to top after clicking on card
  componentDidMount() {
    window.scrollTo(0, 0)
  }


  render() {
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
                title={this.props.location.state.name + " has a poverty rate of " + this.props.location.state.county_poverty_percentage + "%:\n"}> 
                <TwitterIcon size={48} round /> 
              </TwitterShareButton> 
              <FacebookShareButton 
                className='float-right' 
                url={document.URL}> 
                <FacebookIcon size={48} round /> 
              </FacebookShareButton> 

              <ul>
                <li>Cities: {this.props.location.state.cities[0].name} </li> 
                <li>State: {this.props.location.state.state}</li>
                <li>Poverty Population: {this.props.location.state.county_poverty_population} </li>
                <li>Poverty Percentage: {this.props.location.state.county_poverty_percentage}%</li>
              </ul>
              <div align="center">
                <iframe width='600' height='450' src={"https://www.openstreetmap.org/export/embed.html?bbox=" + mapBounds[2] + "%2C" + mapBounds[0] + "%2C" + mapBounds[3] + "%2C" + mapBounds[1]} frameBorder="0" allowFullScreen></iframe>
                <br/>
                <small><a href={"https://www.openstreetmap.org/search?query=" + this.props.location.state.name + "%2C%20" + this.props.location.state.state + "#map=13"}>View Larger Map</a></small>
              </div>
              <h1 align="center"> Cities related to {this.props.location.state.name}</h1>
             <div align="center">
                {this.state.cityInfo.splice(0,1).map((dynamicCity, i) => <CityCard 
                  key = {i} cityInfo = {dynamicCity}/>)}
              </div>


            <h1 align="center"> Charities related to {this.props.location.state.name}</h1>
            <div align = "center">
              {this.state.charityInfo.splice(0,1).map((dynamicCharity, i) => <CharityCard 
                  key = {i} charityInfo = {dynamicCharity}/>)}

            </div>
       </div>
          
          
             
    );
  }
}



export default CountyInstance;   