/*
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
      totalNum: 0,
      sort:"",
      stateFilter:"",

    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateStateFilter = this.updateStateFilter.bind(this);
    this.updatePageWithFilters = this.updatePageWithFilters.bind(this);
    this.updateSort = this.updateSort.bind(this);
  }
 


  async componentWillMount () {
    const citiesResponse = await getCities(this.state.sort,this.state.stateFilter,1) 
    const cities = citiesResponse.objects;
    const numOfCities = citiesResponse.num_results;
    this.setState({ cities: cities, totalNum: numOfCities, activePage:1}); 
  }

  async handlePageChange(pageNumber) {
    const newCitiesResponse = await getCities(this.state.sort,this.state.stateFilter,pageNumber);
    const newCities = newCitiesResponse.objects;
    this.setState({activePage: pageNumber, cities: newCities});
    window.scrollTo(0, 0)
  }

  async updateStateFilter(e){
        //setState is slow 
        await this.setState({stateFilter: e.target.value});
        this.updatePageWithFilters();


  }

  
  async updatePageWithFilters(){
        const citiesResponse = await getCities(this.state.sort,this.state.stateFilters,1);
        const cities = citiesResponse.objects;
        const numOfCities= citiesResponse.num_results;

        this.setState({ cities: cities, totalNum: numOfCities, activePage: 1});

    }


    async updateSort(e){
      var newSort = e.target.value;
      await this.setState({sort: newSort});
      this.updatePageWithFilters();
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

<div class="dropdown" style={{display : 'inline-block'}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort by
  </button>
  <div class="dropdown-menu " aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" value= 'AZ' onClick={this.updateSort} >Name: A-Z </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value='ZA' onClick={this.updateSort}>Name: Z-A </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value= "0100" onClick={this.updateSort}>FightPoverty Score: Low to High </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value= "1000" onClick={this.updateSort}>FightPoverty Score: High to Low </button>


  </div>
</div>

<div class="dropdown" style={{display : 'inline-block'}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter by State
  </button>
  <div class="dropdown-menu pre-scrollable" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" value = 'Texas' onClick = {this.updateStateFilter}> Texas </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value='Kansas' onClick = {this.updateStateFilter}> Kansas </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value='Montana' onClick = {this.updateStateFilter} > Montana </button>

      
  </div>
</div>









        <div className="album py-5 bg-dark">
          <div className="container">

              <div className="row">
              {this.state.cities.map((dynamicCity, i) => <CityCard 
                  key = {i} cityInfo = {dynamicCity}/>)}
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
*/