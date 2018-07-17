import React, { Component } from 'react';
import { getCounties, getMoreCounties, getNumOfCounties } from '../../queries/countyQueries';
import Pagination from "react-js-pagination";
import CountyCard from './CountyCard.js'



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
    // console.log(`active page is ${pageNumber}`);
    const newCounties = await getMoreCounties(pageNumber);
    window.scrollTo(0, 0)

    this.setState({activePage: pageNumber, counties: newCounties});
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
                 <a class="nav-link dropdown-toggle" href="http://example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" align="center">Filter by: </a>
            <div class="dropdown-menu"  aria-labelledby="dropdown04">
              <a class="dropdown-item" align="center" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>

                 <div className="album py-5 bg-dark">
                <div className="container">

                  <div className="row">
                    {this.state.counties.map((dynamicCounty, i) => <CountyCard 
                          key = {i} countyInfo = {dynamicCounty} />)}
                </div>
                </div>
            
            </div>
        
    <div style  = {{width: "50%",  margin: "0 auto"}}>
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