import React, { Component } from 'react';
import { getCounties } from '../../queries/countyQueries';


class CountyInstance extends Component {
  constructor(props){
    super(props);
    this.state = { 
      name : null
    };
  }



  async componentWillMount () {
    const counties = await getCounties()
    this.setState({ counties: counties});
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
                <li>Cities: {this.props.location.state.cities[0].name} </li>
                <li>State: {this.props.location.state.state}</li>
                <li>Poverty Population: {this.props.location.state.county_poverty_population} </li>
                <li>Poverty Percentage: {this.props.location.state.county_poverty_percentage}</li>
              </ul>
              <h1 align="center"> Cities related to {this.props.location.state.name}</h1>
             <div align="center">
              </div>


            <h1 align="center"> Charities related to {this.props.location.state.name}</h1>
            <div align = "center">

            </div>
       </div>
          
          
             
    );
  }
}



export default CountyInstance;   