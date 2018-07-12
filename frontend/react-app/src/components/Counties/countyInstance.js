import React, { Component } from 'react';
import CityCard from '../CityModel/CityCard.js';
import CharityCard from '../CharityModel/CharityCard.js';
import {getSpecificCharity} from '../../queries/charityQueries';
import {getSpecificCity} from '../../queries/cityQueries';


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
                    <h1 className="jumbotron-heading">{this.props.location.state.name}</h1>
                    <p className="lead text-muted"></p>
                  </div>
              </section>

              <ul>
                <li>Cities: {this.props.location.state.cities[0].name} </li> 
                <li>State: {this.props.location.state.state}</li>
                <li>Poverty Population: {this.props.location.state.county_poverty_population} </li>
                <li>Poverty Percentage: {this.props.location.state.county_poverty_percentage}%</li>
              </ul>
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