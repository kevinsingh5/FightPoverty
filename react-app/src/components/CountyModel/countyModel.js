import React, { Component } from 'react';
import { getCounties } from '../../queries/countyQueries';
import Pagination from "react-js-pagination";
import CountyCard from './CountyCard.js'
class CountyModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      counties: []
    };
  }
 
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }

  async componentWillMount () {
    const counties = await getCounties()
    this.setState({ counties: counties });
  }



  render() {

    return (
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
                  key = {i} countyInfo = {dynamicCounty}/>)}
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

export default CountyModel;   