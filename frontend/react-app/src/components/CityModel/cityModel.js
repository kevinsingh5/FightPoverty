import React, { Component } from 'react';
import { getCities, citySearch } from '../../queries/cityQueries';
import Pagination from "react-js-pagination";
import CityCard from './CityCard.js'
import Search from '../Search/Search.js';
import {stateList} from '../../queries/listOfStates.js'

const RESULTS_PER_PAGE = 9

class CityModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      cities : [],
      totalNum: 0,
      sort:"none",
      stateFilters:[],
      states:stateList,
      searchTerm: '',

    };

    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateStateFilter = this.updateStateFilter.bind(this);
    this.updatePageWithFilters = this.updatePageWithFilters.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.reset = this.reset.bind(this);

  }
 


  async componentWillMount () {
    const citiesResponse = await getCities(this.state.searchTerm,this.state.sort,this.state.stateFilters, 1, RESULTS_PER_PAGE) 
    const cities = citiesResponse.objects;
    const numOfCities = citiesResponse.num_results;
    this.setState({ cities: cities, totalNum: numOfCities, activePage:1}); 
  }

  async handlePageChange(pageNumber) {
    const newCitiesResponse = await getCities(this.state.searchTerm,this.state.sort,this.state.stateFilters, pageNumber, RESULTS_PER_PAGE);
    const newCities = newCitiesResponse.objects;
    this.setState({activePage: pageNumber, cities: newCities});
    window.scrollTo(0, 0)
  }

  
  
  async updateStateFilter(e){

        let state = e.target.value;
        console.log(this.state.stateFilters.length)
        if(this.state.stateFilters.length == 0){
          document.getElementById("stateFilter").innerHTML = "State: " + state; 
        }
        else{
          document.getElementById("stateFilter").innerHTML += `, ${state}`; 
        }
        let newStateFilters = this.state.stateFilters
        newStateFilters.push(e.target.value)
        //setState is slow 
        await this.setState({stateFilters: newStateFilters});
        this.updatePageWithFilters();
  }

  
  async updatePageWithFilters(){
        const citiesResponse = await getCities(this.state.searchTerm,this.state.sort,this.state.stateFilters, 1, RESULTS_PER_PAGE);
        const cities = citiesResponse.objects;
        const numOfCities= citiesResponse.num_results;

        this.setState({ cities: cities, totalNum: numOfCities, activePage: 1});

    }


    async updateSort(e){
      var newSort = e.target.value;
      if(newSort == 'AZ'){
        document.getElementById("sort").innerHTML = "Name: A-Z"
      }
      else if(newSort == 'ZA'){
        document.getElementById("sort").innerHTML = "Name: Z-A"
      }
      await this.setState({sort: newSort});
      this.updatePageWithFilters();
    }

    async handleSearch() {
    var newKeyword = document.getElementById("keywords").value;
    await this.setState({searchTerm: newKeyword});

    const cityResponse = await getCities(this.state.searchTerm,this.state.sort,this.state.stateFilters, 1, RESULTS_PER_PAGE)
    const cities = cityResponse.objects;
    const numOfCities = cityResponse.num_results;

    await this.setState({ cities: cities, totalNum: numOfCities, activePage: 1});
  }
  async reset(){
      document.getElementById("sort").innerHTML = "Sort"
      document.getElementById("stateFilter").innerHTML = "Filter by State";


      await this.setState({sort: "none", stateFilters: []})
      this.updatePageWithFilters();
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
<div className="dropdown" style={{display : 'inline-block'}}>
  <button className="btn btn-secondary dropdown-toggle" type="button" id="sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort
  </button>
  <div className="dropdown-menu " aria-labelledby="dropdownMenu2">
    <button className="dropdown-item" type="button" value= 'AZ' onClick={this.updateSort} >Name: A-Z </button>
    <div className="dropdown-divider"></div>
    <button className="dropdown-item" type="button" value='ZA' onClick={this.updateSort}>Name: Z-A </button>


  </div>
</div>

<div className="dropdown" style={{display : 'inline-block'}}>
  <button className="btn btn-secondary dropdown-toggle" type="button" id="stateFilter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter by State
  </button>
  <div className="dropdown-menu scrollable-menu" aria-labelledby="dropdownMenu2">
   {/*makes all state buttons */}
    {this.state.states.map((stateButton,i) => <div><button className="dropdown-item" type="button" value= {stateButton} 
      onClick = {this.updateStateFilter} > {stateButton} </button>  <div className="dropdown-divider"></div></div>
    )}

      
  </div>
</div>
<button type="button" class="btn btn-danger" onClick = {this.reset}>Reset</button>










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
    itemsCountPerPage={RESULTS_PER_PAGE}
    totalItemsCount={this.state.totalNum}
    onChange={this.handlePageChange}
    />
    </div>
  </div>
  );

  }
}

export default CityModel;   
