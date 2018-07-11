import React, { Component } from 'react';
import { getCities } from '../../queries/cityQueries';


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


  render() {

    return (
      
            <div>
              <section className="jumbotron text-center">
                  <div className="container">
                    <h1 className="jumbotron-heading">{this.state.name}</h1>
                    <p className="lead text-muted"></p>
                  </div>
              </section>

              <ul>
                <li>Population: </li>
                <li>State: </li>
                <li>Counties: </li>

              </ul>
            </div>
          
                
      
  
    );
  }
}

export default CityInstance;   