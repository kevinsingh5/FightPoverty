import React, { Component } from 'react';
import $ from 'jquery';
import { TwitterShareButton, FacebookShareButton, TwitterIcon, FacebookIcon } from 'react-share';
import CountyCard from '../CountyModel/CountyCard.js';
import CharityCard from '../CharityModel/CharityCard.js';
import {getSpecificCharity} from '../../queries/charityQueries';
import {getSpecificCounty} from '../../queries/countyQueries';
import {getSpecificCity} from '../../queries/cityQueries';


var mapBounds = [0, 0, 0, 0];

class CityInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      charityInfo : [],
      countyInfo : [],
      name:"",
      state:"",
      county:"",
      average_charity_navigator_score:0,
      average_fight_poverty_score:0

    };
  }

  async componentWillMount () {

    var parts = window.location.href.split('/');
    var link = parts.pop();
    const city = await getSpecificCity(link);
    if(!!city[0]){

    this.setState({name: city[0].name, state: city[0].state , county:city[0].county.name, average_charity_navigator_score: city[0].average_charity_navigator_score,
      average_fight_poverty_score: city[0].average_fight_poverty_score});
    }
    const charity = city[0].charities;
    const county = await getSpecificCounty(city[0].county.name);
    var this2 = this;
    // search for city coordinates
    await $.getJSON('https://nominatim.openstreetmap.org/search?q=' + this.state.name + ',+' + this.state.state + '&format=json', function(data) {
      // do stuff with the data
      //console.log(data);
      if(data.length > 0) {
        var loc = data[0];
        //console.log(location);
        mapBounds = loc['boundingbox'];
        // this2.setState({ charityInfo: charity, countyInfo: county});
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
                    <h1 className="jumbotron-heading">{this.state.name}</h1>
                    <p className="lead text-muted"></p>
                  </div>
              </section>

              <TwitterShareButton 
                className='float-right' 
                url={document.URL} 
                title={"Charites in " + this.state.name + ", " + this.state.state + ":\n"}> 
                <TwitterIcon size={48} round /> 
              </TwitterShareButton> 
              <FacebookShareButton 
                className='float-right' 
                url={document.URL}> 
                <FacebookIcon size={48} round /> 
              </FacebookShareButton> 

              <ul>
                <li>State: {this.state.state} </li>
                <li>County: {this.state.county}</li>
                <li>Average CharityNavigator Score: {this.state.average_charity_navigator_score}</li>
                <li>Average FightPoverty Score: {this.state.average_fight_poverty_score}</li>


              </ul>
      <div align="center">
        <iframe width='600' height='450' src={"https://www.openstreetmap.org/export/embed.html?bbox=" + mapBounds[2] + "%2C" + mapBounds[0] + "%2C" + mapBounds[3] + "%2C" + mapBounds[1]} frameBorder="0" allowFullScreen></iframe>
        
        <br/>
        <small><a href={"https://www.openstreetmap.org/search?query=" + this.state.name + "%2C%20" + this.state.state + "#map=13"}>View Larger Map</a></small>
      </div>
        <h1 align="center"> Charities in {this.state.name}</h1>

                   <div className="row" style={{justifyContent:"center"}}>

        {this.state.charityInfo.map((dynamicCharity, i) => <CharityCard 
                  key = {i} charityInfo = {dynamicCharity}/>)}  
      </div>

        <h1 align="center"> Counties related to {this.state.name}</h1>
           <div className="row" style={{justifyContent:"center"}}>

        {this.state.countyInfo.splice(0,1).map((dynamicCounty, i) => <CountyCard 
                          key = {i} countyInfo = {dynamicCounty} />)}
          </div>

      
  </div>
          
                
      
  
    );

  }
}

export default CityInstance;   
