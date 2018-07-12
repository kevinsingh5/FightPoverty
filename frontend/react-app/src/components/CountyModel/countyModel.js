import React, { Component } from 'react';
import { getCounties, getCounty, getNumOfCounties } from '../../queries/countyQueries';
import Pagination from "react-js-pagination";
import CountyCard from './CountyCard.js'
import CountyInstance from '../Counties/countyInstance.js'



class CountyModel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: 1,
      counties: [],
      totalNum: 0
    };
    this.handlePageChange = this.handlePageChange.bind(this);

  }


  async componentWillMount () {
    const counties = await getCounties()
    const numOfCounties = await getNumOfCounties();
    this.setState({ counties: counties, totalNum: numOfCounties });
  }

 async handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    const newCounties = await getCounty(pageNumber);
    window.scrollTo(0, 0)

    this.setState({activePage: pageNumber, counties: newCounties});
  }

  render() {

    return (
      <div>
            <div>
                 <section className="jumbotron text-center">
                
                <div className="container">
                  <h1 className="jumbotron-heading">Counties</h1>
                  <p className="lead text-muted">Look up any of the counties in the U.S. and find out information about local charities and poverty statistics</p>
                </div>
                 </section>
                 <div className="album py-5 bg-dark">
                <div className="container">

                  <div className="row">
                    {this.state.counties.map((dynamicCounty, i) => <CountyCard 
                          key = {i} countyInfo = {dynamicCounty} onClick = {(dynamicCounty) => this.handleSelectCard(dynamicCounty)}/>)}
                </div>
                </div>
              </div>

            </div>
        
     <div style={{display: 'flex', justifyContent: 'center'}}>
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

export default CountyModel;   