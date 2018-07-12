import React, { Component } from 'react';
import CountyCard from '../CountyModel/CountyCard.js';
import CharityCard from '../CharityModel/CharityCard.js';
import {getSpecificCharity} from '../../queries/charityQueries';
import {getSpecificCounty} from '../../queries/countyQueries';



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
    const charity = await getSpecificCharity(this.props.location.state.charities[0].name)
    // console.log(charity)
    const county = await getSpecificCounty(this.props.location.state.county.name);
    console.log(county);

    this.setState({ charityInfo: charity, countyInfo: county});
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
                <li>State: {this.props.location.state.state} </li>
                <li>Counties: {this.props.location.state.county.name}</li>

              </ul>

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