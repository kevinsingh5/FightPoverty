import React, { Component } from 'react';
import { getCities } from '../../queries/cityQueries';
import Pagination from "react-js-pagination";
import CityCard from './CityCard.js'

class CityModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      cities : []
    };
  }
 
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
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
              <h1 className="jumbotron-heading">Cities </h1>
              <p className="lead text-muted">Browse our large database of cities in the U.S.</p>
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
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <Pagination
    hideNavigation
    pageRangeDisplayed={10}
    activePage={this.state.activePage}
    itemsCountPerPage={10}
    totalItemsCount={200}
    onChange={this.handlePageChange}
    />
    </div>
  </div>
  );

  }
}

export default CityModel;   