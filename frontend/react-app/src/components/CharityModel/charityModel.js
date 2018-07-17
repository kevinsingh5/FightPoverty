import React, { Component } from 'react';
import { getCharities,getMoreCharities, getNumOfCharities } from '../../queries/charityQueries';
import Pagination from "react-js-pagination";
import CharityCard from './CharityCard.js';

class CharityModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 0,
      charities:[],
      totalNum: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this);

  }
 

  async componentWillMount () {
    const charities = await getCharities()
    const numOfCharities = await getNumOfCharities();

    this.setState({ charities: charities, totalNum: numOfCharities, activePage: 1});
  }

  async handlePageChange(pageNumber) {
    const newCharities = await getMoreCharities(pageNumber);
    this.setState({activePage: pageNumber, charities: newCharities});
    window.scrollTo(0, 0)

  }



  render() {

    return (
      <div>
        <section className="jumbotron text-center">
        <div className="container">
          <h1 className="jumbotron-heading">Charities</h1>
          <p className="lead text-muted">Learn about different charities across the U.S.</p>
        </div>
      </section>
  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropdown
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
    <button class="dropdown-item" type="button" > A-Z </button>
    <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button"> Z-A </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button" >FightPoverty Score: 0-100 </button>
      <div class="dropdown-divider"></div>
    <button class="dropdown-item" type="button">FightPoverty Score: 100-0 </button>


  </div>
</div>

      <div className="album py-5 bg-dark">
        <div className="container">

          <div className="row">
            {this.state.charities.map((dynamicCharity, i) => <CharityCard 
                  key = {i} charityInfo = {dynamicCharity}/>)}
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