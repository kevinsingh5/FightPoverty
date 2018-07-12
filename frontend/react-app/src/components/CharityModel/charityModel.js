import React, { Component } from 'react';
import { getCharities,getCharity, getNumOfCharities } from '../../queries/charityQueries';
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
    console.log(`active page is ${pageNumber}`);
    const newCharities = await getCharity(pageNumber);
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

      <div className="album py-5 bg-dark">
        <div className="container">

          <div className="row">
            {this.state.charities.map((dynamicCharity, i) => <CharityCard 
                  key = {i} charityInfo = {dynamicCharity}/>)}
          </div>
          </div>
          </div>
          


    <div style={{display: 'flex', justifyContent: 'center'}}>
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