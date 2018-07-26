import React, { Component } from 'react';
import $ from 'jquery';
import { TwitterShareButton, FacebookShareButton, TwitterIcon, FacebookIcon } from 'react-share';
import CityCard from '../CityModel/CityCard.js';
import CharityCard from '../CharityModel/CharityCard.js';
import {getSpecificCharity} from '../../queries/charityQueries';
import {getSpecificCity} from '../../queries/cityQueries';
import {getSpecificCounty} from '../../queries/countyQueries';
var mapBounds = [0, 0, 0, 0];


class CountyInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      charityInfo: [],
      cityInfo: [],
      name:"",
      cities:"",
      state:"",
      percent:"",
      multiplier:"",
      population:0
    };
  }



  async componentWillMount () {
    
    
      var parts = window.location.href.split('/');
      var link = parts.pop();
      const county = await getSpecificCounty(link);
      if(!!county[0]){
      this.setState({name:county[0].name, cities: county[0].cities[0].name,state:county[0].cities[0].state,
        percent:county[0].county_poverty_percentage,multiplier:county[0].fight_poverty_multiplier,population: county[0].county_poverty_population})
      }

    
  
    const charity = county[0].charities
    const city = county[0].cities;

    var this2 = this;
    // search for city coordinates
    await $.getJSON('https://nominatim.openstreetmap.org/search?q=' + this.state.name + ',+' + this.state.state + '&format=json', function(data) {
      // do stuff with the data
      console.log(data);
      if(data.length > 0) {
        var loc = data[0];
        //console.log(location);
        mapBounds = loc['boundingbox'];
      }
    });

   this.setState({ charityInfo: charity, cityInfo: city});
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
                    <h1 className="jumbotron-heading">{this.state.name}</h1>
                    <p className="lead text-muted"></p>
                  </div>
              </section>

              <TwitterShareButton 
                className='float-right' 
                url={document.URL} 
                title={this.state.name + " has a poverty rate of " + this.state.percent + "%:\n"}> 
                <TwitterIcon size={48} round /> 
              </TwitterShareButton> 
              <FacebookShareButton 
                className='float-right' 
                url={document.URL}> 
                <FacebookIcon size={48} round /> 
              </FacebookShareButton> 

              <ul>
                <li>Cities: {this.state.cities} </li> 
                <li>State: {this.state.state}</li>
                <li>Poverty Population: {this.state.population} </li>
                <li>Poverty Percentage: {this.state.percent}%</li>
                <li>FightPoverty Multiplier: {this.state.multiplier}</li>

              </ul>
              <div align="center">
                <iframe width='600' height='450' src={"https://www.openstreetmap.org/export/embed.html?bbox=" + mapBounds[2] + "%2C" + mapBounds[0] + "%2C" + mapBounds[3] + "%2C" + mapBounds[1]} frameBorder="0" allowFullScreen></iframe>
                <br/>
                <small><a href={"https://www.openstreetmap.org/search?query=" + this.state.name + "%2C%20" + this.state.state + "#map=13"}>View Larger Map</a></small>
              </div>
              <h1 align="center"> Cities in {this.state.name}</h1>
                <div className="row" style={{justifyContent:"center"}}>

                {this.state.cityInfo.map((dynamicCity, i) => <CityCard 
                  key = {i} cityInfo = {dynamicCity} countyName = {this.state.name}/>)}
              </div>


            <h1 align="center"> Charities in {this.state.name}</h1>


            <div className="row" style={{justifyContent:"center"}}>

              {this.state.charityInfo.map((dynamicCharity, i) => <CharityCard 
                  key = {i} charityInfo = {dynamicCharity}/>)}
            </div>


          
       </div>
          
          
             
    );
  }
}



export default CountyInstance;   
