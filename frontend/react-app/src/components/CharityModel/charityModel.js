import React, { Component } from 'react';
import { getCharities, charitySearch } from '../../queries/charityQueries';
import Pagination from "react-js-pagination";
import CharityCard from './CharityCard.js';
import Search from '../Search/Search.js';

class CharityModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      charities:[],
      totalNum: 0,
      sort:"none",
      stateFilters:[],
      states:[],
      searchTerm: ''
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateFilter = this.updateFilter.bind(this);
    this.updatePageWithFilters = this.updatePageWithFilters.bind(this);
    this.updateSort = this.updateSort.bind(this);
  }

  

  async componentWillMount () {
    const charitiesResponse = await getCharities(this.state.sort,this.state.stateFilters,1)
    const charities = charitiesResponse.objects;
    const numOfCharities = charitiesResponse.num_results;

    this.setState({ charities: charities, totalNum: numOfCharities, activePage: 1});
  }

  async handlePageChange(pageNumber) {
    const newCharitiesResponse = await getCharities(this.state.sort,this.state.stateFilters,pageNumber);
    const newCharities = newCharitiesResponse.objects;
    this.setState({activePage: pageNumber, charities: newCharities});
    window.scrollTo(0, 0)

  }


    async updateFilter(e){
    console.log(e.target.value);
    var newFilters = this.state.stateFilters.concat(e.target.value);
    console.log(newFilters);
    //setState is slow 
    await this.setState({stateFilters: newFilters});
    this.updatePageWithFilters();


  }
    async updatePageWithFilters(){
    console.log("CHECK")
    const charitiesResponse = await getCharities(this.state.sort,this.state.stateFilters,1);
    const charities = charitiesResponse.objects;
    const numOfCharities = charitiesResponse.num_results;

    this.setState({ charities: charities, totalNum: numOfCharities, activePage: 1});

    }


    async updateSort(e){
      var newSort = e.target.value;
      console.log(newSort);
      await this.setState({sort: newSort});
      this.updatePageWithFilters();
    }

    async handleSearch(parentObj) {
      var newKeyword = document.getElementById("keywords").value;
      //setState is slow
      await parentObj.setState({searchTerm: newKeyword});

      const charityResponse = await charitySearch(parentObj.state.searchTerm, 1);
      const charities = charityResponse.objects;
      const numOfCharities = charityResponse.num_results;

      await parentObj.setState({ charities: charities, totalNum: numOfCharities, activePage: 1});
    }



  render() {
    return (
      <div>
        <section className="jumbotron text-center">
        <div className="container" style={{ marginBottom: "50px" }}>
          <h1 className="jumbotron-heading">Charities</h1>
          <p className="lead text-muted">Learn about different charities across the U.S.</p>
          <Search searchTerm={this.state.searchTerm} updateTerm={this.handleSearch} parentThis={this} />
        </div>
       
      </section>



  <div class="dropdown" style={{display : 'inline-block'}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Sort:
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" value= 'AZ' onClick={this.updateSort} > A-Z </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value='ZA' onClick={this.updateSort}> Z-A </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value= "0100" onClick={this.updateSort}>FightPoverty Score: 0-100 </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value= "1000" onClick={this.updateSort}>FightPoverty Score: 100-0 </button>


  </div>
</div>

<div class="dropdown" style={{display : 'inline-block'}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter by State:
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" value = 'Texas' onClick = {this.updateFilter}> Texas </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value="Kansas" onClick = {this.updateFilter}> Kansas </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button"> Montana </button>
      
  </div>
</div>



      <div className="album py-5 bg-dark">
        <div className="container">

          <div className="row">
            {this.state.charities.map((dynamicCharity, i) => <CharityCard 
                  key = {i} charityInfo = {dynamicCharity} search = {this.state.searchTerm} />)}
          </div>
          </div>
          </div>
          

    <div>
    <Pagination className = "pagination"
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

export default CharityModel;   