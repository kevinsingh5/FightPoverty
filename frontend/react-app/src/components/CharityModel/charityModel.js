import React, { Component } from 'react';
import { getCharities} from '../../queries/charityQueries';
import Pagination from "react-js-pagination";
import CharityCard from './CharityCard.js';
import Search from '../Search/Search.js';
import {stateList} from '../../queries/listOfStates.js'

const RESULTS_PER_PAGE = 9

class CharityModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      charities:[],
      totalNum: 0,
      sort: "none",
      stateFilters:[],
      scoreFilter: "",
      states: stateList,
      searchTerm: ''
    };
    this.handlePageChange = this.handlePageChange.bind(this);
    this.updateStateFilter = this.updateStateFilter.bind(this);
    this.updateScoreFilter = this.updateScoreFilter.bind(this);

    this.updatePageWithFilters = this.updatePageWithFilters.bind(this);
    this.updateSort = this.updateSort.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  

  async componentWillMount () {
    const charitiesResponse = await getCharities(
      this.state.searchTerm, 
      this.state.sort,
      this.state.stateFilters,
      this.state.scoreFilter,
      1,
      RESULTS_PER_PAGE
    )

    const charities = charitiesResponse.objects;
    const numOfCharities = charitiesResponse.num_results;

    this.setState({ charities: charities, totalNum: numOfCharities, activePage: 1});
  }

  async handlePageChange(pageNumber) {
    const newCharitiesResponse = await getCharities(
      this.state.searchTerm, 
      this.state.sort,
      this.state.stateFilters,
      this.state.scoreFilter,
      pageNumber,
      RESULTS_PER_PAGE
    )

    const newCharities = newCharitiesResponse.objects;
    this.setState({activePage: pageNumber, charities: newCharities});
    window.scrollTo(0, 0)

  }


  async updateStateFilter(e){
        //setState is slow 

        let newStateFilters = this.state.stateFilters
        newStateFilters.push(e.target.value)

        await this.setState({ stateFilters: newStateFilters });
        this.updatePageWithFilters();

  }


    async updateScoreFilter(e){
        await this.setState({scoreFilter: e.target.value});
        this.updatePageWithFilters();


  }
    async updatePageWithFilters(){
        const charitiesResponse = await getCharities(
          this.state.searchTerm, 
          this.state.sort,
          this.state.stateFilters,
          this.state.scoreFilter,
          1,
          RESULTS_PER_PAGE
        );
        const charities = charitiesResponse.objects;
        const numOfCharities = charitiesResponse.num_results;

        this.setState({ charities: charities, totalNum: numOfCharities, activePage: 1});

    }


    async updateSort(e){
      var newSort = e.target.value;
      await this.setState({sort: newSort});
      this.updatePageWithFilters();
    }

    async handleSearch() {
      var newKeyword = document.getElementById("keywords").value;
      await this.setState({searchTerm: newKeyword});

      const charityResponse = await getCharities(
        this.state.searchTerm, 
        this.state.sort, 
        this.state.stateFilters,
        this.state.scoreFilter,
        1,
        RESULTS_PER_PAGE
      )

      const charities = charityResponse.objects;
      const numOfCharities = charityResponse.num_results;

      await this.setState({ charities: charities, totalNum: numOfCharities, activePage: 1});
    }



  render() {
    return (
      <div>
        <section className="jumbotron text-center">
        <div className="container" style={{ marginBottom: "50px" }}>
          <h1 className="jumbotron-heading">Charities</h1>
          <p className="lead text-muted">Learn about different charities across the U.S.</p>
          <Search 
            searchTerm={this.state.searchTerm} 
            updateTerm={this.handleSearch} 
            charitiesFound={this.state.charities.length > 0}
          />
        </div>
       
      </section>



  <div class="dropdown" style={{display : 'inline-block'}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="sort" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
  <button class="btn btn-secondary dropdown-toggle" type="button" id="stateFilter" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter by State
  </button>
  <div class="dropdown-menu pre-scrollable" aria-labelledby="dropdownMenu2">


  {/*makes all state buttons */}
    {this.state.states.map((stateButton,i) => <div><button class="dropdown-item" type="button" value= {stateButton} 
      onClick = {this.updateStateFilter} > {stateButton} </button>  <div class="dropdown-divider"></div></div>
    )}

      
  </div>
</div>


<div class="dropdown" style={{display : 'inline-block'}}>
  <button class="btn btn-secondary dropdown-toggle" type="button" id="filterScore" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Filter by FightPoverty Score
  </button>
  <div class="dropdown-menu pre-scrollable" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" value = '50' onClick = {this.updateScoreFilter}> > 50 </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value='60' onClick = {this.updateScoreFilter}> > 60 </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" value='70' onClick = {this.updateScoreFilter}> > 70 </button>
      <div class="dropdown-divider"></div>
      <button class="dropdown-item" type="button" value='80' onClick = {this.updateScoreFilter}> > 80 </button>
      <div class="dropdown-divider"></div>
      <button class="dropdown-item" type="button" value='90' onClick = {this.updateScoreFilter}> > 90 </button>
      <div class="dropdown-divider"></div>
      <button class="dropdown-item" type="button" value='95' onClick = {this.updateScoreFilter}> > 95 </button>
      <div class="dropdown-divider"></div>


      
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
      itemsCountPerPage={RESULTS_PER_PAGE}
      totalItemsCount={this.state.totalNum}
      onChange={this.handlePageChange}
    />
  </div>
    </div>

    );

  }
}

export default CharityModel;   