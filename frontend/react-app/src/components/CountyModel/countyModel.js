import React, { Component } from 'react';
import { getCounties} from '../../queries/countyQueries';
import Pagination from "react-js-pagination";
import CountyCard from './CountyCard.js'
import Search from '../Search/Search.js';
import {stateList} from '../../queries/listOfStates.js'


const RESULTS_PER_PAGE = 9;

class CountyModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      counties: [],
      searchTerm: '',
      totalNum: 0,
      sort:"none",
      stateFilters:[],
      percentFilter: "",
      states:stateList

    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.updateStateFilter = this.updateStateFilter.bind(this);
    this.updatePercentFilter = this.updatePercentFilter.bind(this);

    this.updatePageWithFilters = this.updatePageWithFilters.bind(this);
    this.updateSort = this.updateSort.bind(this);

  }


  async componentWillMount () {
    const countiesResponse = await getCounties(this.state.searchTerm,this.state.sort,this.state.stateFilters,this.state.percentFilter,1,RESULTS_PER_PAGE);
    const counties = countiesResponse.objects;
    const numOfCounties = countiesResponse.num_results;
    this.setState({ counties: counties, totalNum: numOfCounties, activePage: 1 });
  }

 async handlePageChange(pageNumber) {
    const newCountiesResponse = await getCounties(this.state.searchTerm,this.state.sort,this.state.stateFilters,this.state.percentFilter,pageNumber, RESULTS_PER_PAGE);
    const newCounties = newCountiesResponse.objects;
    this.setState({activePage: pageNumber, counties: newCounties});
    window.scrollTo(0, 0)

  }

 

  async updateStateFilter(e){
        //setState is slow 
        let newStateFilters = this.state.stateFilters;
        newStateFilters.push(e.target.value);
        await this.setState({stateFilters: newStateFilters});
        this.updatePageWithFilters();


  }


    async updatePercentFilter(e){
        let val = parseInt(e.target.value);
        if(val === 9){
           document.getElementById("filterPercent").innerHTML = "Poverty Percentage: < 9%"
        }
        else if(val === 12){
           document.getElementById("filterPercent").innerHTML = "Poverty Percentage: 9-12%"
        }
        else if(val === 15){
           document.getElementById("filterPercent").innerHTML = "Poverty Percentage: 12-15%"
        }
        else if(val === 18){
           document.getElementById("filterPercent").innerHTML = "Poverty Percentage: 15-18%"
        }
        else if(val === 21){
           document.getElementById("filterPercent").innerHTML = "Poverty Percentage: 18-21%"
        }
        else if(val === 24){
           document.getElementById("filterPercent").innerHTML = "Poverty Percentage: > 21%"
        }
        await this.setState({percentFilter: e.target.value});
        this.updatePageWithFilters();


  }
    async updatePageWithFilters(){
      const countyResponse = await getCounties(
        this.state.searchTerm, 
        this.state.sort, 
        this.state.stateFilters,
        this.state.percentFilter,
        1,
        RESULTS_PER_PAGE
      )

      const counties = countyResponse.objects;
      const numOfCounties = countyResponse.num_results;

      await this.setState({ counties: counties, totalNum: numOfCounties, activePage: 1});
  }



    async updateSort(e){
      var newSort = e.target.value;
      if(newSort == 'AZ'){
        document.getElementById("sort").innerHTML = "Name: A-Z"
      }
      else if(newSort == 'ZA'){
        document.getElementById("sort").innerHTML = "Name: Z-A"
      }
      else if(newSort == '0100'){
        document.getElementById("sort").innerHTML = "Poverty Percentage: Low-High"
      }
      else if(newSort == '1000'){
        document.getElementById("sort").innerHTML = "Poverty Percentage: High-Low"
      }
      await this.setState({sort: newSort});
      this.updatePageWithFilters();
    }

     async handleSearch() {
      var newKeyword = document.getElementById("keywords").value;
      await this.setState({searchTerm: newKeyword});

      const countyResponse = await getCounties(
        this.state.searchTerm, 
        this.state.sort, 
        this.state.stateFilters,
        this.state.percentFilter,
        1,
        RESULTS_PER_PAGE
      )

      const counties = countyResponse.objects;
      const numOfCounties = countyResponse.num_results;

      await this.setState({ counties: counties, totalNum: numOfCounties, activePage: 1});
  }

  render() {

    return (
      <div>
            
                 <section className="jumbotron text-center">
                
                        <div className="container" style={{ marginBottom: "50px" }}>
                          <h1 className="jumbotron-heading">Counties</h1>
                          <p className="lead text-muted">Look up any of the counties in the U.S. and find out information about local charities and poverty statistics</p>
                          <Search 
                            searchTerm={this.state.searchTerm} 
                            updateTerm={this.handleSearch} 
                            countiesFound={this.state.counties.length > 0}
                          />
                        </div>
                 </section>

      <div class="dropdown" style={{display : 'inline-block'}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort:
  </button>
  <div class="dropdown-menu " aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" value= 'AZ' onClick={this.updateSort}>Name: A-Z </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value='ZA' onClick={this.updateSort}>Name: Z-A </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value= "0100" onClick={this.updateSort}>Poverty Percentage: Low to High </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value= "1000" onClick={this.updateSort}>Poverty Percentage: High to Low </button>


  </div>
</div>

<div class="dropdown" style={{display : 'inline-block'}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="stateFilter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter by State
  </button>
  <div class="dropdown-menu pre-scrollable" aria-labelledby="dropdownMenu2">
   {this.state.states.map((stateButton,i) => <div><button class="dropdown-item" type="button" value= {stateButton} 
      onClick = {this.updateStateFilter} > {stateButton} </button>  <div class="dropdown-divider"></div></div>
    )}

      
  </div>
</div>


<div class="dropdown" style={{display : 'inline-block'}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="filterPercent" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter by Poverty Percentage
  </button>
  <div class="dropdown-menu pre-scrollable" aria-labelledby="dropdownMenu2" >
    <button class="dropdown-item" type="button" value = '9' onClick = {this.updatePercentFilter}>  &lt; 9% </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value = '12' onClick = {this.updatePercentFilter}>  9-12% </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value='15' onClick = {this.updatePercentFilter}>  12-15% </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value='18' onClick = {this.updatePercentFilter}>  15-18% </button>
      <div class="dropdown-divider"></div>
      <button class="dropdown-item" type="button" value='21' onClick = {this.updatePercentFilter}> 18-21% </button>
      <div class="dropdown-divider"></div>
      <button class="dropdown-item" type="button" value='24' onClick = {this.updatePercentFilter}> >21% </button>
      

      
  </div>
</div>


                 <div className="album py-5 bg-dark">
                <div className="container">

                  <div className="row">
                    {this.state.counties.map((dynamicCounty, i) => <CountyCard
                          key = {i} countyInfo = {dynamicCounty} search = {this.state.searchTerm} />)}
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

export default CountyModel;   