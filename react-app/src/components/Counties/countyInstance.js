import React, { Component } from 'react';
import { getCounties } from '../../queries/countyQueries';


class CountyInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      counties: []
    };
  }

  async componentWillMount () {
    const counties = await getCounties()
    this.setState({ counties: counties });
  }


  render() {

    return (
      <ul>
        {this.state.counties.map((charity, i) => {
          return (
            <div key={i}>
              <section className="jumbotron text-center">
                  <div className="container">
                    <h1 className="jumbotron-heading">{charity.name}</h1>
                    <p className="lead text-muted">{charity.mission_statement}</p>
                  </div>
              </section>

              <ul>
                <li>Population: {charity.cause}</li>
                <li>Cities: {charity.city.name}</li>
                <li>State: {charity.county.name}</li>
                <li>Poverty Percentage: {charity.state}</li>
              </ul>
            </div>
          )
        })}        
      </ul>
          
             
    );
  }
}

export default CountyInstance;   