import React, { Component } from 'react';
import {charities_response} from './charities.js';

class CharityInstance extends Component {
  constructor(props){
    super(props);
    this.state= { 
      name : charities_response.objects[0].name,
      mission :  charities_response.objects[0].mission_statement,
      cause : charities_response.objects[0].cause,
      city : charities_response.objects[0].city.name,
      county : charities_response.objects[0].county.name,
      state : charities_response.objects[0].state,
      zip : charities_response.objects[0].zip_code,
      accRat : charities_response.objects[0].accountability_rating,
      finRat : charities_response.objects[0].financial_rating,
      FPRat : charities_response.objects[0].fight_poverty_rating,
  };
  }
  render(){
  return(
    <div>
    <section class="jumbotron text-center">
        <div class="container">
          <h1 class="jumbotron-heading">{this.state.name}</h1>
          <p class="lead text-muted">{this.state.mission}</p>
        </div>
      </section>

        <ul>
          <li>Cause: {this.state.cause}</li>
          <li>City: {this.state.city}</li>
          <li>County: {this.state.county}</li>
          <li>State: {this.state.state}</li>
          <li>Zip Code: {this.state.zip} </li>
          <li>Accountability Rating: {this.state.accRat}</li>
          <li >Financial Rating:{this.state.finRat}</li>
          <li >FightPoverty Rating: {this.state.FPRat} </li>
        </ul>
        </div>
  );
  }
}

export default CharityInstance;