import React, { Component } from 'react';
import { getCities, getMoreCities,getNumOfCities, citySearch } from '../../queries/cityQueries';
import Pagination from "react-js-pagination";
import CityCard from './CityCard.js'
import Search from '../Search/Search.js';


class CityModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      cities : [],
      totalNum: 0,
      searchTerm: ''
    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
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

  async handleSearch() {
    var newKeyword = document.getElementById("keywords").value;
    await this.setState({searchTerm: newKeyword});

    const cityResponse = await citySearch(this.state.searchTerm,1)
    const cities = cityResponse.objects;
    const numOfCities = cityResponse.num_results;

    await this.setState({ cities: cities, totalNum: numOfCities, activePage: 1});
  }




  render() {

    return (
        <div>
          <section className="jumbotron text-center">
              <div className="container" style={{ marginBottom: "50px" }}>
              <h1 className="jumbotron-heading" >Cities </h1>
              <p className="lead text-muted">Browse our large database that contains information on over 350 cities in the U.S.</p>
              <Search 
                searchTerm={this.state.searchTerm} 
                updateTerm={this.handleSearch} 
                citiesFound={this.state.cities.length > 0}
              />
              </div>
          </section>

        <div className="album py-5 bg-dark">
          <div className="container">

              <div className="row">
              {this.state.cities.map((dynamicCity, i) => <CityCard 
                  key = {i} cityInfo = {dynamicCity} search = {this.state.searchTerm}/>)}
              </div>
        </div>
    </div>
    <div>
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