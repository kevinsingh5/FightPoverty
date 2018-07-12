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
  
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {

    return (
          <div>
                  <section className="jumbotron text-center">
                  <div className="container">
                    <h1 className="jumbotron-heading">{this.props.location.state.name}</h1>
                    <p className="lead text-muted">{this.props.location.state.mission_statement}</p>
                  </div>
              </section>

              <ul> 
                <li>Cause: {this.props.location.state.cause}</li>
                <li>Address: {this.props.location.state.address}</li>
                <li>City: {this.props.location.state.city.name}</li>
                <li>County: {this.props.location.state.county.name}</li>
                <li>State: {this.props.location.state.city.state}</li>
                <li>Zip Code:  {this.props.location.state.zip_code}</li>
                <li><a href= 'https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=1093'>CharityNavigator's Accountability Score</a>: {this.props.location.state.charity_navigator_accountability_score} </li>
                <li><a href= 'https://www.charitynavigator.org/index.cfm?bay=content.view&cpid=35'>CharityNavigator's Financial Score</a>: {this.props.location.state.charity_navigator_financial_score}</li>
                <li>FightPoverty Rating: {this.props.location.state.fight_poverty_score}</li>
              </ul>

              <h1 align="center"> Cities related to {this.props.location.state.name}</h1>
            <div align="center">
            </div>


            <h1 align="center"> Counties related to {this.props.location.state.name}</h1>
            <div align = "center">

              </div>
       </div>
              
      

    );
  }
}

export default CharityInstance;      