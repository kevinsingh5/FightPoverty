import React, { Component } from 'react';
import { getCharities } from '../../queries/charityQueries';


class CharityInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      charities: []
    };
  }

  async componentWillMount () {
    const charities = await getCharities()
    this.setState({ charities: charities });
  }


  render() {

    return (
      <div>
        <ul>
          {this.state.charities.map((charity, i) => {
            return (
              <div key={i}>
                <section className="jumbotron text-center">
                    <div className="container">
                      <h1 className="jumbotron-heading">{charity.name}</h1>
                      <p className="lead text-muted">{charity.mission_statement}</p>
                    </div>
                </section>

                <ul>
                  <li>Cause: {charity.cause}</li>
                  <li>City: {charity.city.name}</li>
                  <li>County: {charity.county.name}</li>
                  <li>State: {charity.state}</li>
                  <li>Zip Code: {charity.zip} </li>
                  <li>Accountability Rating: {charity.accRat}</li>
                  <li >Financial Rating:{charity.finRat}</li>
                  <li >FightPoverty Rating: {charity.FPRat} </li>
                </ul>
              </div>
            )
          })}        
        </ul>
      </div>
    );
  }
}

export default CharityInstance;      