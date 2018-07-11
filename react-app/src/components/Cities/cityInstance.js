import React, { Component } from 'react';
import { getCities } from '../../queries/cityQueries';


class CityInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      cities: []
    };
  }

  async componentWillMount () {
    const cities = await getCities()
    this.setState({ cities: cities });
  }


  render() {

    return (
      <ul>
        {this.state.cities.map((city, i) => {
          return (
            <div key={i}>
              <section className="jumbotron text-center">
                  <div className="container">
                    <h1 className="jumbotron-heading">{city.city}</h1>
                    <p className="lead text-muted"></p>
                  </div>
              </section>

              <ul>
                <li>Population: {city.population}</li>
                <li>State: {city.state}</li>
                <li>Counties: {charity.counties.Name}</li>
              </ul>
            </div>
          )
        })}        
      </ul>
  
    );
  }
}

export default CityInstance;   