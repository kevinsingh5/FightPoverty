import React, { Component } from 'react';
import $ from 'jquery';
import { TwitterShareButton, FacebookShareButton, TwitterIcon, FacebookIcon } from 'react-share'; 
import CityCard from '../CityModel/CityCard.js';
import CountyCard from '../CountyModel/CountyCard.js';
import {getSpecificCounty} from '../../queries/countyQueries';
import {getSpecificCity} from '../../queries/cityQueries';
import {getSpecificCharity} from '../../queries/charityQueries'

var mapBounds = [0, 0, 0, 0];

class CharityInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      cityInfo: [],
      countyInfo: [],
      name:"",
      cause:"",
      address:"",
      city:"",
      county:"",
      state:"",
      zip_code:"",
      acc_score:"",
      fin_score:"",
      cn_score:"",
      fp_score:"",
      mission_statement:""
    };
  }

  async componentWillMount () {

     var parts = window.location.href.split('/');
      var link = parts.pop();
      const charity = await getSpecificCharity(link);
      if(!!charity[0]){

      await this.setState({name: charity[0].name, cause: charity[0].cause,city:charity[0].city.name,
        county:charity[0].county.name,state:charity[0].city.state,zip_code: charity[0].zip_code, 
        acc_score:charity[0].charity_navigator_accountability_score,fin_score:charity[0].charity_navigator_financial_score,cn_score:charity[0].charity_navigator_score,
      fp_score:charity[0].fight_poverty_score, address: charity[0].address, mission_statement: charity[0].mission_statement})
    }

    const city = await getSpecificCity(charity[0].city.name);
    const county = await getSpecificCounty(charity[0].county.name);

    var this2 = this;
    // search for city coordinates
    await $.getJSON('https://nominatim.openstreetmap.org/search?q=' + this.state.address + ',+' + this.state.city + ',+' + this.state.state + '&format=json', function(data) {
      // do stuff with the data
      console.log(data);
      if(data.length > 0) {
        var loc = data[0];
        //console.log(location);
        mapBounds = loc['boundingbox'];
        console.log(data);
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
                    <h1 className="jumbotron-heading">{this.state.name}</h1>
                    <p className="lead text-muted">{this.state.mission_statement}</p>
                  </div>
              </section>

              <TwitterShareButton
                className='float-right'
                url={document.URL}
                title={this.state.name + " has a FightPoverty score of " + this.state.fp_score + ":\n"}>
                <TwitterIcon size={48} round />
              </TwitterShareButton>
              <FacebookShareButton
                className='float-right'
                url={document.URL}>
                <FacebookIcon size={48} round />
              </FacebookShareButton>

              <ul> 
                <li>Cause: {this.state.cause}</li>
                <li>Address: {this.state.address}</li>
                <li>City: {this.state.city}</li>
                <li>County: {this.state.county}</li>
                <li>State: {this.state.state}</li>
                <li>Zip Code:  {this.state.zip_code}</li>
                <li><a href= 'https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1093'>CharityNavigator's Accountability Score</a>: {this.state.acc_score} </li>
                <li><a href= 'https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=35'>CharityNavigator's Financial Score</a>: {this.state.fin_score}</li>
                <li>CharityNavigator Rating: {this.state.cn_score}</li>
                <li>FightPoverty Rating: {this.state.fp_score}</li>
              </ul>
              <div align="center">
                <iframe width='600' height='450' src={"https://www.openstreetmap.org/export/embed.html?bbox=" + mapBounds[2] + "%2C" + mapBounds[0] + "%2C" + mapBounds[3] + "%2C" + mapBounds[1]} frameBorder="0" allowFullScreen></iframe>
                <br/>
                <small><a href={"https://www.openstreetmap.org/search?query=" + this.state.address + "%2C%20" + this.state.city + "%2C%20" + this.state.state + "#map=13"}>View Larger Map</a></small>
              </div>

              <h1 align="center"> Cities related to {this.state.name}</h1>
            <div className="row" style={{justifyContent:"center"}}>
                 {this.state.cityInfo.splice(0,1).map((dynamicCity, i) => <CityCard 
                  key = {i} cityInfo = {dynamicCity}/>)}

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

export default CharityInstance;      