import React, { Component } from 'react';
import { getCities, getMoreCities,getNumOfCities } from '../../queries/cityQueries';
import Pagination from "react-js-pagination";
import CityCard from './CityCard.js'

class CityModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      cities : [],
      totalNum: 0
    };

    this.handlePageChange = this.handlePageChange.bind(this);
  }
 


  async componentWillMount () {
    const cities = await getCities() 
    const numOfCities = await getNumOfCities();
    this.setState({ cities: cities, totalNum: numOfCities}); 
  }

  async handlePageChange(pageNumber) {
    // console.log(`active page is ${pageNumber}`);
    const newCities = await getMoreCities(pageNumber);
    window.scrollTo(0, 0)
    this.setState({activePage: pageNumber, cities: newCities});
  }



  render() {

    return (
        <div>
          <section className="jumbotron text-center">
              <div className="container">
              <h1 className="jumbotron-heading">Cities </h1>
              <p className="lead text-muted">Browse our large database that contains information on over 350 cities in the U.S.</p>
              </div>
          </section>

        <div className="album py-5 bg-dark">
          <div className="container">

              <div className="row">
              {this.state.cities.map((dynamicCity, i) => <CityCard 
                  key = {i} cityInfo = {dynamicCity}/>)}
              </div>
        </div>
    </div>
    <div style  = {{width: "50%",  margin: "0 auto"}}>
    <Pagination
    pageRangeDisplayed={10}
    activePage={this.state.activePage}
    activeLinkClass = "active"
    itemsCountPerPage={9}
    totalItemsCount={this.state.totalNum}
    onChange={this.handlePageChange}
    />
    </div>
  </div>
  );

  }
}

export default CityModel;   