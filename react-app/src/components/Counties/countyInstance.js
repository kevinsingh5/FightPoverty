import React, { Component } from 'react';
import { getCounties } from '../../queries/countyQueries';


class CityInstance extends Component {
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
        {this.state.counties.map((county, i) => {
          return (
            <div key={i}>
              <section className="jumbotron text-center">
                  <div className="container">
                    <h1 className="jumbotron-heading">{county.city}</h1>
                    <p className="lead text-muted"></p>
                  </div>
              </section>

              <ul>
                <li>Population: {county.population}</li>
                <li>Cities: {county.cities.name}</li>
                <li>State: {county.state}</li>
                <li>Poverty Percentage: {county.poverty_percentage}</li>

              </ul>
            </div>
          )
        })}        
      </ul>
    );
  }
}

export default CityInstance;   