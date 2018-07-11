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
    const charity = await getCharities();
    this.setState({ charities: charity });
  }


  render() {

    return (
          <div>
                  <section className="jumbotron text-center">
                  <div className="container">
                    <h1 className="jumbotron-heading">{this.props.match.params.name}</h1>
                    <p className="lead text-muted"></p>
                  </div>
              </section>

              <ul>
                <li>Cause: </li>
                <li>City: </li>
                <li>County: </li>
                <li>State: </li>
                <li>Zip Code:  </li>
                <li>Accountability Rating: </li>
                <li >Financial Rating:</li>
                <li >FightPoverty Rating:  </li>
              </ul>
            </div>
              
      

    );
  }
}

export default CharityInstance;      