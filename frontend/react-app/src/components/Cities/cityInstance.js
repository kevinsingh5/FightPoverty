import React, { Component } from 'react';
import { getCities } from '../../queries/cityQueries';
import CountyCard from '../CountyModel/CountyCard.js'


class CityInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      name : props.match.params.name
    };
  }

  async componentWillMount () {
    const cities = await getCities()
    this.setState({ cities: cities });
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
                <li>Population: </li>
                <li>State: {this.props.location.state.state} </li>
                <li>Counties: {this.props.location.state.county.name}</li>

              </ul>

        <h1 align="center"> Charities in {this.props.location.state.name}</h1>
      <div align="center">
            </div>


        <h1 align="center"> Counties related to {this.props.location.state.name}</h1>
      <div align = "center">
            <CountyCard countyInfo = {this.props.location.state} />

          </div>

      
  </div>
          
                
      
  
    );
  }
}

export default CityInstance;   